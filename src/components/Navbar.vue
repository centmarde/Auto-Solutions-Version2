<template>
    <v-app>
      <v-app-bar
        app
        fixed
        :color="theme === 'dark' ? 'grey darken-4' : 'grey lighten-3'"
        :style="{ color: theme === 'light' ? '#333' : '#fff' }"
      >
        <v-toolbar-title class="d-flex align-items-center">
         
          <span id="gidor" class="ms-2">AUTO-SOLUTIONS</span>
        </v-toolbar-title>
  
        <v-spacer></v-spacer>
  
      
  
        <v-navigation-drawer
          v-model="isMenuVisible"
          permanent
          app
        >
          <v-list>
            <v-list-item v-for="(item, index) in menuItems" :key="index">
              <v-list-item-link :href="item.link" @click="closeMenu">
                {{ item.text }}
              </v-list-item-link>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
  
        <v-btn
          class="ms-3"
          @click="closeMenu"
          text
        >
          <router-link to="/login" style="color: rgb(97, 40, 255);">RENT A CAR</router-link>
        </v-btn>
  
        <v-btn text @click="closeMenu">LOGIN</v-btn>
        <v-icon class="ms-1">mdi-account-circle</v-icon>
        
        <v-switch
          v-model="themeSwitch"
          @change="toggleTheme"
          class="ms-3 mt-5"
          :label="theme === 'dark'"
        >
          <template v-slot:thumb>
            <v-icon>{{ theme === 'dark' ? 'mdi-sun' : 'mdi-moon' }}</v-icon>
          </template>
        </v-switch>
        <v-btn
          icon
          @click="toggleMenu"
          aria-label="Toggle navigation"
        >
          <v-icon>{{ isMenuVisible ? 'mdi-menu-open' : 'mdi-menu' }}</v-icon>
        </v-btn>
      </v-app-bar>
    </v-app>
  </template>
  
  <script setup>

  
  const isMenuVisible = ref(false);
  const theme = ref(localStorage.getItem('theme') || 'dark'); // Load saved theme or default to dark
  const themeSwitch = ref(theme.value === 'light');
  const menuItems = [
    { text: 'CARS FOR SALE', link: '#CarSale' },
    { text: 'SELL YOUR CAR', link: '#sellcar23' },
    { text: 'REVIEWS', link: '#stack' },
  ];
  
  const closeMenu = () => {
    isMenuVisible.value = false;
  };
  
  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };
  
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', theme.value);
    localStorage.setItem('theme', theme.value); // Save theme in local storage
    themeSwitch.value = theme.value === 'light';
  };
  
  onMounted(() => {
    document.documentElement.setAttribute('data-bs-theme', theme.value); // Apply saved theme on mount
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
  
  /* Add responsive styles as needed */
  </style>
  