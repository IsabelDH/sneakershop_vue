<script>
export default {
  methods: {
    logout() {
      // Verwijder het token bij uitloggen
      localStorage.removeItem("token");

      // Navigeer naar de loginpagina (deze route moet bestaan in je router)
      this.$router.push("/login");  // Zorg ervoor dat je naar de juiste login route navigeert
    },
  },
};
</script>

<template>
  <div class="dashboard">
    <h1>Welkom op het Dashboard!</h1>
    <button @click="logout">Uitloggen</button>
  </div>
</template>

<style scoped>
.dashboard {
  text-align: center;
  margin-top: 50px;
}
</style>
