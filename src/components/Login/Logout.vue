<template>
    <div>
      <button @click="$emit('logout')">Logout</button>
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
    background-color: #000000;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #a7bf49;
    color: #000000;
  }
  </style>
  