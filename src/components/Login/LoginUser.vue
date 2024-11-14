<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5000/login', {
            email: this.email,
            password: this.password,
          });
          
          localStorage.setItem('token', response.data.token);
  
          // Redirect na succesvol inloggen
          this.$router.push('/dashboard');
        } catch (err) {
          this.error = 'Invalid login credentials. Please try again.';
        }
      },
    },
  };
  </script>
  
  <template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>

      <button type="submit">Login</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
<style>

.login {
  max-width: 100%;
  margin: 20px auto;
  padding: 20px;
  background-color: #626e8a;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(166, 167, 214, 0.1);
  display: flex; 
  flex-direction: column; 
  justify-content: center;
  
}

h2 {
  text-align: left;
  margin-bottom: 20px;
  color: #041016;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
  color: #c3d0d7;
}

input {
  width: 20%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: #dce3e7;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}

@media(max-width: 650px) {
  .login {
    max-width: 500px;
    padding: 15px;
  }

  input {
    width: 100%;
  }
  
}
</style>
  