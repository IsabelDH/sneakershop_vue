<script setup>
import { ref, onMounted } from 'vue';
// import Login from './components/Login/LoginUser.vue';
// import Dashboard from './components/Dashboard.vue';
import { useRouter } from 'vue-router';

const isLoggedIn = ref(false);
const router = useRouter();

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push('/dashboard');
  } else {
    router.push('/login');
  }
});
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>

 
</style>
