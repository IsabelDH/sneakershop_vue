<script>
export default {
  data() {
    return {
      // Standaard is de gebruiker niet ingelogd
      isLoggedIn: false,
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
      this.isLoggedIn = false; // Zet de loginstatus naar false bij uitloggen
      this.$router.push('/login');
    },
  },
};
  </script>

<template>
    <nav class="navbar" v-if="isLoggedIn">
      <ul>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><a @click="logout">Logout</a></li>
      </ul>
    </nav>
  </template>

  
  <style>
  .navbar {
    background-color: #333;
    padding: 10px;
    color: white;
  }
  
  .navbar ul {
    list-style: none;
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
  }
  
  .navbar a {
    text-decoration: none;
    color: white;
  }
  </style>
  