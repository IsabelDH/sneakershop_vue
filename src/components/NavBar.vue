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
    <nav class="navbar" v-if="isLoggedIn">
      <div class="logo">
        <a href="/dashboard"><img src="../../SWEAR_Logo.webp" alt="SWEAR logo"></a>
      </div>
      <ul class="nav-links">
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><Logout @logout="logout" /></li>
      </ul>
    </nav>
  
</template>

  
  <style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  padding: 10px 20px;
  color: white;
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
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #64f243;
}
  </style>
  