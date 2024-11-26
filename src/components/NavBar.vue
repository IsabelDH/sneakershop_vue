<script>
import Logout from './Login/Logout.vue';
export default {
  data() {
    return {
      isLoggedIn: false,  // Gebruiker is niet ingelogd bij het laden
    };
  },
  mounted() {
    // Controleer of het token aanwezig is in localStorage zodra de component is geladen
    this.isLoggedIn = !!localStorage.getItem('token');
  },
  methods: {
    logout() {
      // Verwijder het token en stuur de gebruiker naar de loginpagina
      localStorage.removeItem("token");
      this.isLoggedIn = false;  // Zet de loginstatus naar false bij uitloggen
      this.$router.push('/login');  // Navigeer naar loginpagina
    },
  },
  components: {
    Logout,  
  },
};
  </script>

<template>
    <nav class="navbar bg-offblack text-white" v-if="isLoggedIn">
      <div class="logo">
        <a href="/dashboard"><img src="../../SWEAR_Logo.webp" alt="SWEAR logo"></a>
      </div>
      <ul class="nav-links">
        <li class="text-white"><router-link class="font-medium hover:text-primary" to="/dashboard">Dashboard</router-link></li>
        <li class="font-medium"><Logout @logout="logout" /></li>
      </ul>
    </nav>
  
</template>

  
<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Logo */
.navbar .logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

img{
  width: 80%;
}

/* Navigatielinks */
.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li {
  font-size: 1rem;
  margin-top: 20px;
}

.nav-links a {
  text-decoration: none;
  transition: color 0.3s ease;
}
</style>
  