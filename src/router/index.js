import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login/LoginUser.vue';
import Dashboard from '../components/Dashboard.vue';

// Definieer je routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login, // Dit kan de loginpagina zijn of een andere component
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },  // Geeft aan dat deze route een inlog vereist
  },
];

// Maak de router aan
const router = createRouter({
  history: createWebHistory(),
  routes,  // Voeg de gedefinieerde routes toe aan de router
});

// Router Guard - Voordat elke route wordt bezocht
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  // Als de gebruiker al is ingelogd en naar de loginpagina probeert te gaan, redirect naar /dashboard
  if (to.path === '/' && isAuthenticated) {
    next('/dashboard');
  } 
  // Als de gebruiker naar de /dashboard route probeert te gaan zonder ingelogd te zijn, redirect naar /login
  else if (to.path === '/dashboard' && !isAuthenticated) {
    next('/login');
  } 
  else {
    next(); // Ga door naar de gevraagde route
  }
});

export default router;
