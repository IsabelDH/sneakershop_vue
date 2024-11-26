<template>
    <h1 class="text-black text-3xl font-bold">Account</h1>
    <div class="change-password bg-grey" >
      <h2 class="text-black text-2xl font-bold">Change password</h2>
      <form @submit.prevent="changePassword">
        <div class="input-group">
          <label for="oldPassword" class="text-black">Current password</label>
          <input
            type="password"
            id="oldPassword"
            v-model="oldPassword"
            placeholder="Current password"
            required
          />
        </div>
        
        <div class="input-group">
          <label for="newPassword" class="text-black">New password</label>
          <input
            type="password"
            id="newPassword"
            v-model="newPassword"
            placeholder="New password"
            required
          />
        </div>
        
        <div class="input-group">
          <label for="confirmPassword" class="text-black">Confirm new password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm new password"
            required
          />
        </div>
        
        <button type="submit" class="text-white bg-black hover:text-black hover:bg-secondary w-48 h-10 font-bold">
          Change password
        </button>
  
        <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-500 mt-4">{{ success }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import NavBar from './NavBar.vue';
  
  export default {
    components: { NavBar },
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: null,
        success: null,
        loading: false, 
      };
    },
    methods: {
      async changePassword() {
        this.error = null;
        this.success = null;
  
        // Valideer dat de wachtwoorden overeenkomen
        if (this.newPassword !== this.confirmPassword) {
          this.error = 'The new passwords do not match.';
          return;
        }
        this.loading = true; // Zet de loading status naar true
  
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Geen token gevonden');
          }
  
          // Verstuur de wachtwoordwijziging naar de backend
          const response = await axios.put(
            'https://sneakershop-6lmk.onrender.com/api/v1/users/updatepassword',
            {
              oldPassword: this.oldPassword,
              newPassword: this.newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
          );
  
          if (response.data && response.data.status === 'success') {
            this.success = 'Password changed successfully.';
            this.oldPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
          } else {
            this.error = response.data.message || 'An error occurred';
          }
        } catch (err) {
          this.error =
            err.response?.data?.message || 'An error occurred while changing the password.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  h1{
    margin-top:20%;
  }
  h2{
    margin-bottom: 20px;
  }
  .change-password {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;

  }
  .input-group {
    margin-bottom: 20px;
  }
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  button {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
  }

  @media(min-width: 1000px) {
    h1 {
      margin-top: 10%;
    }
  }
  </style>
  