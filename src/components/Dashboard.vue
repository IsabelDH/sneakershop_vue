<script>
import OrderList from './Orders/OrderList.vue';
import NavBar from './NavBar.vue';

export default {
  components: { OrderList, NavBar},
  data() {
    return {
      orders: [] // Lijst van orders
    };
  },
  async mounted() {
    const token = localStorage.getItem('token');
    const response = await fetch('https://sneakershop-6lmk.onrender.com/api/v1/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    this.orders = data.data;
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
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  }
};
</script>

<template>
  <div class="dashboard">
    <NavBar @logout="logout" />
    <OrderList :orders="orders" @change-status="changeStatus" />
  </div>
</template>

<style scoped>
.dashboard {
  margin: 20px;
  margin-top: 10vh;
  text-align: center;
}
</style>
