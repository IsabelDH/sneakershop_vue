<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';

// Toon NavBar alleen als de route niet '/login' is
const route = useRoute();
// const showNavBar = ref(route.path !== '/login');

const router = useRouter();
const isLoggedIn = ref(false);


onMounted(() => {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token; // Zet de loginstatus op basis van de aanwezigheid van het token

  // Zorg ervoor dat de router correct werkt
  if (isLoggedIn.value) {
    router.push('/dashboard');
  } else {
    router.push('/login');
  }
});

</script>

<template>
     <NavBar v-if="isLoggedIn" :isLoggedIn="isLoggedIn" />
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>

 
</style>
