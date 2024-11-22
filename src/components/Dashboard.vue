<script>
// export default {
//   methods: {
//     logout() {
//       localStorage.removeItem("token");
//       this.$router.push("/login");  
//     },
//   },
// };
export default {
  data() {
    return {
      orders: []  // Deze lijst wordt gevuld met de orders van de backend
    };
  },
  async mounted() {
    // Haal de orders op bij de backend
    const token = localStorage.getItem('token');
    const response = await fetch('https://sneakershop-6lmk.onrender.com/api/v1/orders', {
      headers: {
        Authorization: `Bearer ${token}`  // Stuur de token voor authenticatie
      }
    });

    const data = await response.json();
    this.orders = data.orders;
  },
  methods: {
    async changeStatus(orderId, status) {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://sneakershop-6lmk.onrender.com/api/v1/orders/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await response.json();
      if (data.success) {
        this.orders = this.orders.map(order => 
          order.id === orderId ? { ...order, status } : order
        );
      } else {
        alert('Fout bij het bijwerken van de orderstatus');
      }
    },logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");  
    },
  }
};
</script>

<template>
  <div class="dashboard bg-primary">
    <h1>Admin Dashboard</h1>
    <div v-if="orders.length === 0">Geen orders gevonden</div>
    <table v-else>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Klantennaam</th>
          <th>Status</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button @click="changeStatus(order.id, 'verzonden')">Verzonden</button>
            <button @click="changeStatus(order.id, 'geannuleerd')">Annuleren</button>
            <button @click="changeStatus(order.id, 'in productie')">In Productie</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.dashboard {
  text-align: center;
  margin-top: 50px;
}
</style>
