
<script>
import axios from 'axios';
import io from 'socket.io-client';

export default {
  
  data() {
    return {
      orders: [],
      allOrders: [], 
      filteredOrdersList: [],
      orderCount: 0, //teller voor het aantal orders
      selectedStatus: '',
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
    this.allOrders = [...this.orders]; 
    this.filteredOrdersList = [...this.orders];

    this.filteredOrders();

    this.socket = io('https://sneakershop-6lmk.onrender.com', {
    transports: ['websocket'], // Forceer websockets in plaats van polling
});
// Luister naar het 'new-order' event
this.socket.on('New order', (order) => {
  console.log('Nieuwe bestelling ontvangen:', order);
  this.orders.unshift(order);
  this.orders = this.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  this.orderCount += 1; //verhoog het aantal orders
  
  this.filteredOrders();
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
  filteredOrders() {
    if (this.selectedStatus) {
      // Filteren op status
      this.orders = this.allOrders.filter(order => order.status === this.selectedStatus);
    } else {
      // Als geen status geselecteerd is, toon alle orders
      this.orders = this.allOrders;
    }
    this.orderCount = this.orders.length; // Herbereken het aantal orders na filteren
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

<template>
  <div class="order-list">
    <h1 class="text-black text-4xl font-bold">Orders</h1>
    <h2 class="processed text-xl"><strong>Total orders:</strong> {{ orderCount }}</h2> 

    <div class="status-filter mb-4">
      <label for="status" class="mr-2">Filter by status:</label>
      <select v-model="selectedStatus" id="status" class="border px-4 py-2  bg-white" @change="filteredOrders">
        <option value="">All</option>
        <option value="New order">New order</option>
        <option value="Pending">Pending</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>

    <div class="table-responsive">
    <table class="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr class="bg-grey">
          <th class="border border-gray-200 px-4 py-2 text-left">Order</th>
          <th class="border border-gray-200 px-4 py-2 text-left">Customer</th>
          <th class="border border-gray-200 px-4 py-2 text-left">Status</th>
          <th class="border border-gray-200 px-4 py-2 text-left">Created at</th>
          <th class="border border-gray-200 px-4 py-2 text-left">Delete order</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id" class="hover:bg-gray-100">
          <td class="border hover:bg-primary border-gray-200 px-4 py-2">
            <router-link class="hover:text-black" :to="{ name: 'OrderDetail', params: { id: order._id }}">
              {{ order.nameOrder || 'N/A' }}
            </router-link>
          </td>
          <td class="border border-gray-200 px-4 py-2">{{ order.user || 'N/A' }}</td>
          <td class="border border-gray-200 px-4 py-2"><strong>{{ order.status || 'N/A' }}</strong></td>
          <td class="border border-gray-200 px-4 py-2">{{ formatDate(order.createdAt) }}</td>
          <td class="border border-gray-200 px-4 py-2">
            <button @click="deleteOrder(order._id)" class="btn text-white bg-black hover:text-white hover:bg-red py-1.1 font-bold">Delete order</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="spacing-below-table"></div>
  </div>
</template>
    <!-- <p class="processed text-l"><strong>Total orders being processed:</strong> {{ orderCount }}</p> 
      <ul class="border-primary">
      <li class="text-l font-semibold  text-black bg-white hover:text-black hover:bg-secondary" v-for="order in orders" :key="order._id">
        <router-link class=" hover:text-black" :to="{ name: 'OrderDetail', params: { id: order._id }}">
          {{ order.user }} - {{ order.order }} - {{ order.status }}
          <p>Created at: {{ formatDate(order.createdAt) }}</p>
         <br v-if="order.statusChangedAt">Status Changed At: {{ formatDate(order.statusChangedAt) }}
        </router-link>
        <button @click="deleteOrder(order._id)" class=" btn hover:text-white hover:bg-black text-black bg-secondary py-1.1 font-bold">Delete order</button>
      </li>
    </ul> -->


<style scoped>
h1{
  margin-bottom: 20px;
  border-bottom: 2px solid #5dde40;
}

.processed{
  margin-bottom: 20px;
}

/* Algemene styling voor de filter */
.status-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.status-filter label {
  font-weight: bold;
}

.status-filter select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Responsieve container */
.table-responsive {
  margin-bottom: 60px;
  margin-left: -50px;
}
.spacing-below-table {
  height: 20px; 
}

/* Stijl voor de tabel en cellen */
table tbody tr:hover {
  background-color: #5dde40; 
}

/* Hover tekstkleur bij links */
table tbody tr:hover .nameOrder-link {
  color: black;  
}

/* Hover-effect voor de tabelcel */
table tbody tr:hover td {
  background-color: #5dde40;  
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}
th, td {
  text-align: left;
  padding: 12px;
}
th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.btn{
  margin-bottom: 2px;
  padding: 5px 10px;
  
}

.order-list{
  margin-bottom: 50px;
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

@media(min-width: 700px) {
  .table-responsive {
    margin-bottom: 20px;
    margin-left: 20px;
  }

}


</style>
