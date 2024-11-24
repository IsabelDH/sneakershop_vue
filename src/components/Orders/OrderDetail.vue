<template>
    <div class="order-detail">
      <h1>Order Details</h1>
      <p><strong>User:</strong> {{ order.user }}</p>
      <p><strong>Order ID:</strong> {{ order._id }}</p>
      <p><strong>Order:</strong> {{ order.order }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
      <!-- Voeg hier andere order details toe -->
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'],
    data() {
      return {
        order: null,
      };
    },
    async mounted() {
  console.log('Order ID:', this.id);  // Dit zou de juiste ID moeten loggen
  const response = await fetch(`https://sneakershop-6lmk.onrender.com/api/v1/orders/${this.id}`);
  const data = await response.json();
  console.log('Order Details:', data);  // Dit zou de orderdetails moeten loggen
  this.order = data.order;
}

  };
  </script>
  