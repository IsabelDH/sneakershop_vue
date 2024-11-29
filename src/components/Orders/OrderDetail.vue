<template>
 <div class="order-detail">
    <h1 class="text-black text-3xl font-bold">Order Detail</h1>
    <div class="details" v-if="order">
      <p><strong>Created at:</strong>  {{ formatDate(order.createdAt) }}</p>
      <p><strong>User:</strong> {{ order.user }}</p>
      <p><strong>Email:</strong> {{ order.email }}</p>
      <p><strong>Address:</strong> {{ order.address }}</p>
      <p><strong>Order:</strong> {{ order.order }}</p>
      <!-- <p><strong>Status:</strong> {{ order.status }}</p> -->
      <OrderActions :orderId="order._id" :currentStatus="order.status"  @change-status="changeStatus" />
    </div>
    <div v-else>
      <p>Order details are being loaded...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import OrderActions from './OrderActions.vue';
import NavBar from '../NavBar.vue';
export default {
  components: { OrderActions, NavBar },
  props: ['id'], // Ontvang de ID van de order via de router
  data() {
    return {
      order: null,
    };
  },
  async mounted() {
    await this.fetchOrderDetails();
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
      return new Date(date).toLocaleDateString('en-US', options);
    },
    async fetchOrderDetails() {
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

    // Wijzig de status van de order
    async changeStatus(orderId, status) {
  console.log("Te versturen payload:", { status });
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Geen token gevonden');
    }

    // Verstuur de statusupdate naar de API
    const response = await axios.put(
      `https://sneakershop-6lmk.onrender.com/api/v1/orders/${this.id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data.status === 'success') {
      this.order.status = status; // Update de status van de huidige order
    } else {
      console.error('Fout bij het bijwerken van de status:', response.data.message);
      alert('Er is een fout opgetreden bij het bijwerken van de status.');
    }
  } catch (error) {
    console.error(
      'Er is een fout opgetreden bij het wijzigen van de status:',
      error.response ? error.response.data : error.message
    );
  }
}

  },
};
</script>
<style scoped>
.order-detail {
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: left; 
}

h1 {
  margin-top: 20%;
  border-bottom: 2px solid #5dde40;
  margin-bottom: 20px;
  width: 100%;  
  text-align: center;  
}

.order-detail p {
  margin-bottom: 10px;  
}

@media(min-width: 1000px) {
  .details {
    padding: 20px;
    display: flex;
    flex-direction: column;
    text-align: left; 
    margin-left: 35%;
  }
  h1{
    margin-top: 10%;
  }
}


</style>


  