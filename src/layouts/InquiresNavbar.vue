<template>
    <header
      class="navbar navbar-expand-lg fixed-top"
      :class="{'navbar-dark': isDark, 'navbar-light': !isDark}"
      :style="{ backgroundColor: isDark ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: isDark ? '#fff' : '#333' }"
    >
      <div class="container-fluid">
        <!-- Logo and Title Section -->
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="@/assets/images/logo.jpeg" alt="logo" class="logopic" height="50" />
          <h3 id="gidor" class="ms-2 mb-0">Auto Solutions</h3>
        </a>
  
        <!-- Hamburger Menu Button -->
        <button class="navbar-toggler" type="button" @click="toggleMenu" aria-controls="navbarNav" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Navbar Links -->
        <div class="collapse navbar-collapse" :class="{ show: isMenuVisible }" id="navbarNav">
          <div class="ms-auto d-flex align-items-center justify-content-end w-100">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/Inbox" class="nav-link btn wes" @click="closeMenu">INBOX</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Home" class="nav-link btn wes" @click="closeMenu">HOME</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/UserInfo" class="nav-link btn wes" @click="closeMenu" style="text-transform: uppercase;">{{ username }} </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/" class="nav-link btn wes" @click="handleLogout">LOGOUT</router-link>
              </li>
            </ul>
            <router-link to="/UserInfo" @click="closeMenu">
              <img :src="userImage" class="rounded-circle"
                style="width: 3rem; height: 3rem; object-fit: cover; border: 2px solid white;" />
            </router-link>
  
            <!-- Theme Toggle -->
            <div class="d-flex align-items-center ms-3">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="themeSwitch" :checked="theme === 'light'"
                  @change="toggleTheme">
                <label class="form-check-label" for="themeSwitch">
                  <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon'"></i>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useUserStore } from '../stores/store';
  
  const userStore = useUserStore();
  
  
  const { username, userImage, isMenuVisible, isDark, fetchUserData, handleLogout, toggleMenu, closeMenu, toggleTheme, initTheme } = userStore;
  
  
  onMounted(() => {
    initTheme(); 
    fetchUserData(); 
  });
  </script>
  
  
  <style scoped>
  .logopic {
    border-radius: 30px;
    max-width: 100px; /* Ensures logo doesn't grow too large */
  }
  
  #gidor {
    font-size: 1.2rem;
    font-family: "Merriweather", serif; 
  }
  
  /* Media queries for responsive design */
  @media (max-width: 992px) { /* Large tablets and small desktops */
    #gidor {
      font-size: 1.25rem;
    }
  }
  
  @media (max-width: 768px) { /* Tablets */
    .logopic {
      height: 40px; /* Smaller logo for smaller screens */
    }
  
    #gidor {
      font-size: 1rem; /* Smaller title for smaller screens */
    }
  }
  
  @media (max-width: 280px) { /* Mobile devices */
    .logopic {
      height: 30px; /* Even smaller logo for mobile */
    }
  
    #gidor {
      font-size: 0.6rem; /* Adjust title size for mobile */
    }
  }
  
  /* Button styles */
  .btn {
    text-decoration: none;
    font-size: 10px;
    border: none;
    background: none;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
  }
  
  .btn::before {
    margin-left: auto;
  }
  
  .btn::after,
  .btn::before {
    content: '';
    width: 0%;
    height: 2px;
    background: rgb(97, 40, 255);
    display: block;
    transition: 0.5s;
  }
  
  .btn:hover::after,
  .btn:hover::before {
    width: 100%;
  }
  
  .drp_btn {
    margin-top: 2px;
  }
  </style>
  