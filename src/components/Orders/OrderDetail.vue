<template>
 <div class="order-detail">
    <h1>Order Detail</h1>
    <div v-if="order">
      <p><strong>User:</strong> {{ order.user }}</p>
      <p><strong>Email:</strong> {{ order.email }}</p>
      <p><strong>Address:</strong> {{ order.address }}</p>
      <p><strong>Order:</strong> {{ order.order }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
      <OrderActions :orderId="order._id" @change-status="changeStatus" />
    </div>
    <div v-else>
      <p>Order details are being loaded...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import OrderActions from './OrderActions.vue';
export default {
  components: { OrderActions },
  props: ['id'], // Ontvang de ID van de order via de router
  data() {
    return {
      order: null, // Houdt de ordergegevens bij
    };
  },
  async mounted() {
    await this.fetchOrderDetails();
  },
  methods: {
    // Haal de orderdetails op bij de API
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

// export default {
//   props: ['id'], // Ontvang de ID als prop via de router
//   data() {
//     return {
//       order: null,
//     };
//   },
//   async mounted() {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('Geen token gevonden');
//       }

//       const response = await axios.get(`https://sneakershop-6lmk.onrender.com/api/v1/orders/${this.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       this.order = response.data.data;
//     } catch (error) {
//       console.error('Er is een fout opgetreden bij het ophalen van de orderdetails:', error);
//     }
//   },
//   methods: {
//     async changeStatus(orderId, status) {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('Geen token gevonden');
//         }

//         // Verstuur status update naar de API
//         const response = await axios.put(
//           `https://sneakershop-6lmk.onrender.com/api/v1/orders/${orderId}`,
//           { status },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (response.data.success) {
//           // Werk de status lokaal bij
//           this.orders = this.orders.map(order =>
//             order._id === orderId ? { ...order, status } : order
//           );
//         } else {
//           console.error('Fout bij het bijwerken van de status:', response.data.message);
//         }
//       } catch (error) {
//         console.error('Er is een fout opgetreden bij het wijzigen van de status:', error);
//       }
//     },
//   },
// };
</script>
<style scoped>
.order-detail {
  padding: 20px;
}

</style>


  