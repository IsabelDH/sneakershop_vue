<template>
  <div class="flex">
    <!-- Dropdown to change the order status -->
    <label for="status">Status:</label>
    <select 
      v-model="selectedStatus" 
      @change="updateStatus"
      :disabled="isLoading" 
      class="p-2 border rounded"
    >
      <option value="New order">New order</option>
      <option value="Pending">Pending</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  </div>
</template>
<!-- <template>
  <div>
    <button @click="$emit('change-status', orderId, 'New order')" class="text-white bg-black hover:text-black hover:bg-secondary font-bold">New order</button>
    <button @click="$emit('change-status', orderId, 'Pending')" class="text-white bg-black hover:text-black hover:bg-secondary font-bold">Pending</button>
    <button @click="$emit('change-status', orderId, 'Delivered')" class="text-white bg-black hover:text-black hover:bg-secondary font-bold">Delivered</button>
    <button @click="$emit('change-status', orderId, 'Cancelled')" class="text-white bg-black hover:text-black hover:bg-secondary font-bold">Cancelled</button>
  </div>
</template> -->

<script>
export default {
  props: ['orderId', 'currentStatus'],
  data() {
    return {
      selectedStatus: this.currentStatus || 'New order',  
      isLoading: false, 
    };
  },
  methods: {
    async updateStatus() {
      this.isLoading = true;
      try {
        await this.$emit('change-status', this.orderId, this.selectedStatus);
      } catch (error) {
        console.error('Error changing status:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  watch: {
    currentStatus(newStatus) {
      if (newStatus !== this.selectedStatus) {
        this.selectedStatus = newStatus;  
      }
    }
  },
};
// export default {
//   props: ['orderId'], 
// };
</script>

<style scoped>

button {
  margin: 10px;
  padding: 10px 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

select {
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: whitesmoke;
}

select:disabled {
  background-color: #f1f1f1;
}

.flex {
  display: flex;
  align-items: center;
}



</style>
