<template>
  <div>
    <button @click="$emit('change-status', orderId, 'new order')" class="text-white bg-black hover:text-black hover:bg-secondary font-bold">New order</button>
    <button @click="$emit('change-status', orderId, 'pending')" class="text-white bg-black hover:text-black hover:bg-secondary font-bold">Pending</button>
    <button @click="$emit('change-status', orderId, 'delivered')" class="text-white bg-black hover:text-black hover:bg-secondary font-bold">Delivered</button>
    <button @click="$emit('change-status', orderId, 'cancelled')" class="text-white bg-black hover:text-black hover:bg-secondary font-bold">Cancelled</button>
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
  border: none;
  cursor: pointer;
}


</style>
