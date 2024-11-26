<template>
  <div class="order-list">
    <h1 class="text-black text-4xl font-bold">Orders</h1>
    <p class="processed text-l"><strong>Total orders being processed:</strong> {{ orderCount }}</p>
    <ul class="border-primary">
      <li class="text-l font-semibold  text-black bg-white hover:text-black hover:bg-secondary" v-for="order in orders" :key="order._id">
        <router-link class=" hover:text-black" :to="{ name: 'OrderDetail', params: { id: order._id }}">
          {{ order.user }} - {{ order.order }} - {{ order.status }}
          <p>Created at: {{ formatDate(order.createdAt) }}</p>
          <!-- <br v-if="order.statusChangedAt">Status Changed At: {{ formatDate(order.statusChangedAt) }} -->
        </router-link>
        <button @click="deleteOrder(order._id)" class=" btn text-white bg-black hover:text-black hover:bg-secondary py-1.1 font-bold">Delete order</button>
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
h1{
  margin-bottom: 20px;
  border-bottom: 2px solid #5dde40;
}

.processed{
  margin-bottom: 20px;
}


.btn{
  margin-top: 10%;
  margin-bottom: 2px;
}

.order-list ul {
  list-style: none;
  padding: 0;

  gap: 15px;
  display: flex;
  flex-wrap: wrap; 
  justify-content: flex-start; 
  gap: 20px; 
}

.order-list li {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
}

</style>
