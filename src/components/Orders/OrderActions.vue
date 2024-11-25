<template>
  <div>
    <button @click="$emit('change-status', orderId, 'Send')">Send</button>
    <button @click="$emit('change-status', orderId, 'Cancelled')">Cancelled</button>
    <button @click="$emit('change-status', orderId, 'In production')">In production</button>
    <button @click="$emit('change-status', orderId, 'Pending')">Pending</button>
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
