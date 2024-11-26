<template>
  <div class="order-list">
    <h1>Orders</h1>
    <p>Total orders: {{ orderCount }}</p>
    <ul>
      <li v-for="order in orders" :key="order._id">
        <router-link :to="{ name: 'OrderDetail', params: { id: order._id }}">
          {{ order.user }} - {{ order.order }} - {{ order.status }}
          <br>Created at: {{ formatDate(order.createdAt) }}
          <!-- <br v-if="order.statusChangedAt">Status Changed At: {{ formatDate(order.statusChangedAt) }} -->
        </router-link>
        <button @click="deleteOrder(order._id)" class="bg-black text-white">Delete order</button>
      </li>
    </ul>
  </div>
</template>


<script>
import axios from 'axios';
import io from 'socket.io-client';

export default {
  
  data() {
    return {
      orders: [],
      orderCount: 0, //teller voor het aantal orders
      socket: null,
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
    console.log('API Response:', response);
    this.orders = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    this.orderCount = this.orders.length; //tel het aantal orders

    this.socket = io('https://sneakershop-6lmk.onrender.com', {
  transports: ['websocket'], // Forceer websockets in plaats van polling
});
// Luister naar het 'new-order' event
this.socket.on('new order', (order) => {
  console.log('Nieuwe bestelling ontvangen:', order);
  this.orders.unshift(order);
  this.orders = this.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  this.orderCount += 1; //verhoog het aantal orders
  console.log('Bijgewerkte orders:', this.orders);  // Log de bijgewerkte array
});



  } catch (error) {
    console.error('Er is een fout opgetreden bij het ophalen van de orders:', error);
  }
},
methods: {
  formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },

  updateOrderStatus(updatedOrder) {
    const orderIndex = this.orders.findIndex(order => order._id === updatedOrder._id);
    if (orderIndex !== -1) {
      this.$set(this.orders, orderIndex, updatedOrder);
    }
  },
    async deleteOrder(orderId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Geen token gevonden');
        }

        // Verwijder de bestelling uit de API
        const response = await axios.delete(`https://sneakershop-6lmk.onrender.com/api/v1/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Verwijder de bestelling uit de orders array in de frontend
          this.orders = this.orders.filter(order => order._id !== orderId);
          this.orderCount -= 1; //verlaag het aantal orders
        } else {
          alert('Er is een fout opgetreden bij het verwijderen van de bestelling.');
        }

      } catch (error) {
        console.error('Er is een fout opgetreden bij het verwijderen van de bestelling:', error);
        alert('Er is een fout opgetreden bij het verwijderen van de bestelling.');
      }
    },
    
  },
  
};
</script>

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
