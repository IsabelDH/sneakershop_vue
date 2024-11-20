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
          const response = await axios.post('https://sneakershop-6lmk.onrender.com/api/v1/users/login', {
            email: this.email,
            password: this.password,
          });

          const token = response.data.token;
          localStorage.setItem("token", token);

          // Directly navigate to the dashboard without any delay
          this.$router.push('/dashboard');
        } catch (err) {
          this.error = 'Invalid login credentials. Please try again.';
        }
      }

    },
  };
  </script>
  
  <template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login" name="loginForm">
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
        <p v-if="error" style="color:red;">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <style>
  .login {
    max-width: 130%;
    margin: 20px auto;
    padding: 40px;
    background-color: #062121;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(166, 167, 214, 0.1);
    display: flex; 
    flex-direction: column; 
    justify-content: center;
  }
  
  h2 {
    text-align: left;
    margin-bottom: 20px;
    color: #c1e4e3;
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
    width: 100%; 
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f1eaea;
    color: #062121;
    box-sizing: border-box; 
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
    color: rgb(205, 29, 52);
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
  }
  
  @media(max-width: 650px) {
    .login {
      max-width: 400px; 
      padding: 15px;
    }
  
    h2 {
      font-size: 1.5rem; 
    }
  
    input, button {
      width: 100%; 
      font-size: 14px;
    }
  
    .input-group {
      margin-bottom: 15px; 
    }
  }
  
  @media(max-width: 1000px) {
    .login {
      max-width: 500px; 
      padding: 20px;
    }
  
    input, button {
      font-size: 15px; 
    }
  }
  </style>  