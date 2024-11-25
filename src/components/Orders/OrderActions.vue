<template>
  <div>
    <button @click="$emit('change-status', orderId, 'new order')">New order</button>
    <button @click="$emit('change-status', orderId, 'cancelled')">Cancelled</button>
    <button @click="$emit('change-status', orderId, 'pending')">Pending</button>
  </div>
</template>

<script>
export default {
  props: ['orderId'], 
};
</script>

<style scoped>

button {
  margin: 10px;
  padding: 10px 10px;
  font-size: 16px;
  background-color: #000000;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #38d655 ;
  color: black;
}

</style>
