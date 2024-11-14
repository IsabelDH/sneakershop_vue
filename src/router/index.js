import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login/LoginUser.vue';
import Dashboard from '../components/Dashboard.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
  } else {
    
    next();
  }
});

export default router;
