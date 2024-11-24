<template>
    <div>
      <button @click="$emit('change-status', orderId, 'verzonden')">Verzonden</button>
      <button @click="$emit('change-status', orderId, 'geannuleerd')">Annuleren</button>
      <button @click="$emit('change-status', orderId, 'in productie')">In Productie</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['orderId']
  };
  </script>
  
  <style scoped>
  button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  