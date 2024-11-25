<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
    };
  },
  async mounted() {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Geen token gevonden');
    }

    // Stuur de aanvraag met het token als autorisatie header
    const response = await axios.get('https://sneakershop-6lmk.onrender.com/api/v1/orders', {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    this.orders = response.data.data;
  } catch (error) {
    console.error('Er is een fout opgetreden bij het ophalen van de orders:', error);
  }
},
};
</script>

<template>
  <div class="order-list">
    <h1>Orders</h1>
    <ul>
      <li v-for="order in orders" :key="order._id">
        <router-link :to="{ name: 'OrderDetail', params: { id: order._id }}">
          {{ order.user }} - {{ order.order }} - {{ order.status }}
        </router-link>
      
      </li>
    </ul>
  </div>
</template>

<style scoped>
.order-list ul {
  list-style: none;
  padding: 0;
}

.order-list li {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
