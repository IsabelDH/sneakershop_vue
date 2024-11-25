<script>
export default {
  props: ['id'],
  data() {
    return {
      order: null,
    };
  },
  async mounted() {
  // Log de ID om te controleren of het goed wordt doorgegeven
  console.log('Order ID:', this.id);

  try {
    const response = await fetch(`https://sneakershop-6lmk.onrender.com/api/v1/orders/${this.id}`);
    const data = await response.json();
    this.order = data.order;  // Zet de opgehaalde order in de data
    console.log('Order details:', this.order);  // Log de order details
  } catch (error) {
    console.error('Error fetching order details:', error);
  }
},

};
</script>

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
  

  