import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login/LoginUser.vue';
import Dashboard from '../components/Dashboard.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },  // Optionally check authentication
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Router Guard - Voordat elke route wordt bezocht
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Continue to the requested route
  }
});


export default router;
