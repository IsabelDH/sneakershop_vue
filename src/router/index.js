import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login/LoginUser.vue'
import Dashboard from '../components/Dashboard.vue';

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

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');  
  } else if (to.path === '/' && isAuthenticated) {
    next('/dashboard');  
  } else {
    next();  
  }
});

export default router;
