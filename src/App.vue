<script setup>
import { ref, onMounted } from 'vue';
import Login from './components/Login/LoginUser.vue';
import Dashboard from './components/Dashboard.vue';

const isLoggedIn = ref(false);

onMounted(() => {
  if (localStorage.getItem('token')) {
    isLoggedIn.value = true;
  }
});
</script>

<template>
  <div>
    <Login v-if="!isLoggedIn" />
    <Dashboard v-if="isLoggedIn" />
  </div>
</template>

<style scoped>

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  
  }
 
</style>
