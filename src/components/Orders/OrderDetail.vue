<template>
 <div class="order-detail">
    <h1>Order Detail</h1>
    <div v-if="order">
      <p><strong>Gebruiker:</strong> {{ order.user }}</p>
      <p><strong>Product:</strong> {{ order.order }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
    </div>
    <div v-else>
      <p>Orderdetails worden geladen...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'], // Ontvang de ID als prop via de router
  data() {
    return {
      order: null,
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Geen token gevonden');
      }

      const response = await axios.get(`https://sneakershop-6lmk.onrender.com/api/v1/orders/${this.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.order = response.data.data;
    } catch (error) {
      console.error('Er is een fout opgetreden bij het ophalen van de orderdetails:', error);
    }
  },
};
</script>
<style scoped>
.order-detail {
  padding: 20px;
}
</style>


  