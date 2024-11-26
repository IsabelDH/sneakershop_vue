<template>
    <div>
      <button class="bg-black text-white hover:bg-secondary hover:text-black" @click="$emit('logout')">Logout</button>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  button {
    margin-top: -9px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  </style>
  