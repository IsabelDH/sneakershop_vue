<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");  
    },
  },
};
</script>

<template>
   <nav class="navbar">
        <!-- Logo -->
        <a href="index.html" class="logo">
            <img src="" alt="Logo">
        </a>
    
        <!-- Hamburger icon for mobile -->
        <div class="hamburger" id="hamburger">
            &#9776; 
        </div>
    
        <!-- Close icon for mobile menu -->
        <div class="close-menu" id="close-menu" >
            &times; 
        </div>
    
        <!-- Menu links -->
        <div class="menu" id="menu">
            <a href="index.html">Home</a>
            <a href="resume.html">Resume</a>
            <a href="mywork.html">My work</a>
            <a href="contact.html" class="contact-link active btn">Contact</a>
        </div>
    </nav>
  <div class="dashboard">
    <h1>Welkom op het Dashboard!</h1>
    <button @click="logout">Uitloggen</button>
  </div>
</template>

<style scoped>
.dashboard {
  text-align: center;
  margin-top: 50px;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #949feb;
    height: 60px;
    background-image: radial-gradient(circle, #414254 5%, transparent 4%);
    background-size: 20px 20px;
}

.navbar .logo img {
    height: 40px;
}

.menu {
    display: flex; 
    gap: 20px;
}

.hamburger, .close-menu {
    font-size: 30px;
    cursor: pointer;
    color: #292f35;
    display: none; 
}

.menu a {
    padding: 15px;
    color: #292f35;
    font-size: 17px;
    text-decoration: none;
}

.close-menu {
    position: fixed;
    top: 13px;
    right: 20px;
    font-size: 40px;
    cursor: pointer;
    color: #292f35;
    display: none; 
    z-index: 1000; 
}

.menu a.active {
    color: #f0e8e1; 
}


/* Alternatieve hover styling voor actieve link om consistentie te waarborgen */
.menu a.active:hover {
    color: #A9B1E5; 
}

.menu a.contact-link {
    background-color: #A9B1E5; 
    color: #292f35; 
    border-radius: 10px;
}

.menu a.contact-link:hover {
    background-color: #d8c5e8; 
    color: #292f35;
}

/* Actieve stijl voor de Contact link als deze ook de actieve pagina is */
.menu a.contact-link.active {
    background-color: #A9B1E5; 
    color: #292f35; 
}

.menu a.contact-link.active.btn {
    background-color: #6549c0; 
    color: #f0e8e1; 
    text-decoration: none;
}

/* Stijlen voor mobiele apparaten (tot 768px) */
@media (max-width: 768px) {
    .menu {
        display: flex;
        flex-direction: column;
        background-color: #949feb;
        position: fixed; 
        top: 10px;
        right: -110%; 
        width: 210px; 
        height: 33vh; 
        padding-top: 14px;
        transition: right 0.3s ease; 
        margin-right: 5px;
        border-radius: 14px;
        border: 1px solid #DEE7F1;
        background-image: radial-gradient(circle, #414254 5%, transparent 4%);
        background-size: 20px 20px;
        
    }

    .menu a {
        display: block;
        font-size: 18px;
        padding: 13px;
        color: #292f35; 
        font-weight: 700;
        text-align: left;
        padding-left: 40px;
        
    }

    .hamburger {
        display: block;
    }

    .close-menu {
        display: none;
    }

    .menu.active {
        right: 0; 
    }
    .menu.active ~ .close-menu {
        display: block;
    }

    /*btn contact*/
    .navbar a:nth-last-child(1){
        background-color:#c7b2db ;
        color: #292f35;
        padding: 10px;
        border-radius: 10px;
        margin-left: 31px;
        margin-right: 20px;
        font-weight: 600;
        
    }
    .navbar a:nth-last-child(1):hover{
        background-color:#9277ed ;
        color:  #f0e8e1;
        padding: 10px;
        border-radius: 10px;
      
    }

    .navbar a:hover{
        text-decoration: none;
        color: #f0e8e1;
        font-size: 18px;
    }
    
}

/* Stijlen voor tablet en bredere schermen (vanaf 768px) */
@media (min-width: 768px) {
    .menu {
        display: flex;
        position: static;
        flex-direction: row;
        background-color: transparent;
        width: auto;
    }

    .hamburger, .close-menu {
        display: none !important;
    }


    .menu a {
        color: #292f35;
        font-weight: 700;
        
    }
    .navbar a:hover{
        text-decoration: none;
        color: #f0e8e1;
        font-size: 17px;
    }

    .navbar a:nth-last-child(1){
        background-color:#c7b2db ;
        color: #292f35;
        border-radius: 20px;
        font-weight: 600;
        
    }
    .navbar a:nth-last-child(1):hover{
        background-color:#9277ed ;
        color:  #f0e8e1;
        border-radius: 20px;
      
    }
}
</style>
