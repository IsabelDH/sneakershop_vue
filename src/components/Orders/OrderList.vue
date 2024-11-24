<template>
    <div>
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
              <OrderActions
                :order-id="order.id"
                @change-status="changeStatus"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import OrderActions from './OrderActions.vue';
  
  export default {
    components: { OrderActions },
    props: {
      orders: {
        type: Array,
        default: () => []  // Zorgt ervoor dat orders altijd een lege array is als het undefined is
      }
    },
    methods: {
      changeStatus(orderId, status) {
        this.$emit('change-status', orderId, status);
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    margin: 20px auto;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  </style>
  