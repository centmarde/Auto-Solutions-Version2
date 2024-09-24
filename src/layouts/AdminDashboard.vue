<template>
    <div class="w-100 d-flex h-100 gap-5">
      <div
        class="w-25 h-100 p-5"
        :class="{'navbar-dark': isDark, 'navbar-light': !isDark}"
        :style="{ backgroundColor: isDark ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: isDark ? '#fff' : '#333' }"
      >
        <div class="d-flex justify-content-center align-content-center flex-column h-50">
          <!-- First Link (Dashboard) -->
          <div class="mt-5"
          >
            <i class="fa-solid fa-house fa-lg"></i>
            <router-link
              to="/Dashboard"
              class="btn wes fw-bold mt-1 text-white"
              :class="{ underline: route.path === '/Dashboard' }"
            >
              <p id="fonts" class="mt-4">Dashboard</p>
            </router-link>
          </div>
        
  
        <!-- Second Link (View As Client) -->
        <div
        >
          <i class="fa-solid fa-user fa-lg"></i>
          <router-link
            to="/home"
            class="btn wes fw-bold mt-1 text-white"
            :class="{ underline: route.path === '/home' }"
          >
            <p id="fonts" class="mt-4">View As Client</p>
          </router-link>
        </div>
      </div>
    </div>

      <div class="d-flex justify-content-center gap-5 w-100 flex-wrap">
        <Card title="Total Car in Sell" />
        <Card title="Total Car in Rent" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useTheme } from 'vuetify'; 
  import { useRoute } from 'vue-router';
  import Card from './Card.vue';
  
  const theme = useTheme();
  const isDark = ref(theme.global.current.value.dark); 
  
  const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    isDark.value = newTheme === 'dark';
    localStorage.setItem('theme', newTheme); 
  };
  
  const route = useRoute();
  
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    theme.global.name.value = savedTheme;
    isDark.value = savedTheme === 'dark';
  });
  </script>
  
  <style>
  .underline {
    text-decoration: underline;
  }
  #fonts {
    font-size: 1.2rem;
    font-family: "Merriweather", serif; 
  }
  </style>
  