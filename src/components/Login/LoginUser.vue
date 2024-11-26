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
     <nav class="navbar bg-offblack text-white">
      <div class="logo">
       <img src="/SWEAR_Logo.webp" alt="SWEAR logo">
      </div>
    </nav>
    <div class="login bg-grey">
      <h2 class="text-black text-2xl font-bold">Login admin</h2>
      <form @submit.prevent="login" name="loginForm">
        <div class="input-group">
          <label for="email" class="text-black">Email</label>
          <input
            type="email"
            id="email"
            class="text-black"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>

      <div class="input-group">
        <label for="password"  class="text-black">Password</label>
        <input
          type="password"
          id="password"
          class="text-black"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>

      <button type="submit" class="text-white bg-black hover:text-black hover:bg-secondary w-48 h-10 font-bold">Login</button>

      <p v-if="error" class="text-red error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <style>
  .login {
    max-width: 70%; 
    margin:  20vh auto;
    padding: 40px;
    border-radius: 8px;
    display: flex; 
    flex-direction: column; 
    justify-content: center;
    border: #5dde40 solid 1px;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: left;
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
    padding: 10px;
    margin-top: 60px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .error {
    font-size: 17px;
    text-align: center;
    margin-top: 20px;
  }
  .navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


img{
  width: 80%;
  margin-top: 10px;
}
  
  @media(max-width: 650px) {
    .login {
      padding: 15px;
      max-width: 80%;
    }
  
    h2 {
      font-size: 1.5rem; 
    }
  
    input, button {
      font-size: 14px;
    }
  
    .input-group {
      margin-bottom: 15px; 
    }
  }
  
  @media(max-width: 1000px) {
    .login {
      padding: 20px;
    }
  
    input, button {
      font-size: 15px; 
    }
  }
  </style>  