<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");  
    },
  },
};
</script>

<template>
  <div class="dashboard bg-primary">
    <h1>Welkom op het Dashboard!</h1>
    <!-- <button @click="logout">Uitloggen</button> -->
  </div>
</template>

<style scoped>
.dashboard {
  text-align: center;
  margin-top: 50px;
}
</style>
