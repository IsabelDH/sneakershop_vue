import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login/LoginUser.vue'
import Dashboard from '../components/Dashboard.vue';
import OrderList from '../components/Orders/OrderList.vue'; 


const routes = [
  {
    path: '/login',
    name: 'Login',  
    component: Login,  
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',  
    component: Dashboard, 
    meta: { requiresAuth: true },  
    children: [
      {
        path: 'orders',
        component: OrderList, 
      },
    ],
  },
];

// Maak de router aan
const router = createRouter({
  history: createWebHistory(),
  routes,  
});

// Router Guard - Voordat elke route wordt bezocht
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  // Als de route authenticatie vereist en de gebruiker is niet ingelogd
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');  // Ga naar de root route (loginpagina)
  } else if (to.path === '/' && isAuthenticated) {
    next('/dashboard');  // Als de gebruiker ingelogd is, ga naar het dashboard
  } else {
    next();  // Volg de oorspronkelijke route
  }
});


export default router;
