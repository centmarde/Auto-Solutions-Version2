<template>
  
  <div class="w-100 d-flex h-100 gap-5">
    <div
      class="w-25 h-100 p-5 d-none d-md-block"
      :class="{'navbar-dark': isDark, 'navbar-light': !isDark}"
      :style="{ backgroundColor: isDark ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: isDark ? '#fff' : '#333' }"
    >
   
      <div class="d-flex justify-content-center align-content-center flex-column h-50 position-fixed ">
        <!-- First Link (Dashboard) -->
        <div class="mt-5  ">
          <i class="fa-solid fa-house fa-lg"></i>
          <router-link
            to="/Admin"
            class="btn wes fw-bold mt-1 text-white "
            :class="{ underline: route.path === '/Admin' }"
          >
            <p id="fonts" class="mt-4  ">Dashboard</p>
          </router-link>
        </div>

        <!-- Second Link (View As Client) -->
        <div class="position-relative bot">
          <i class="fa-solid fa-user fa-lg"></i>
          <router-link
            to="/home"
            class="btn wes fw-bold mt-1 text-white"
            :class="{ underline: route.path === '/home' }"
          >
            <p id="fonts" class="mt-4">View As Client</p>
          </router-link>

          
        </div>

           <!-- Third Link (Logout) -->

        <div class="position-relative bot tops ">
          <i class="fa-solid fa-right-from-bracket fa-lg"></i>
          <router-link
            to="/"
            class="btn wes fw-bold mt-1 text-white"
            :class="{ underline: route.path === '/' }"
            @click="handleLogout"
          >
            <p id="fonts" class="mt-4">Logout</p>
          </router-link>

          
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center gap-5 w-100 flex-wrap">
      <!-- Pass the car count to the Card component -->
      <Card title="Total Cars for Sale" :num="carCount" />
      <Card class="mt" title="Total Cars for Rent" :num="totalCarsForRent" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { useRoute } from 'vue-router';
import { supabase, doLogout as supabaseLogout } from '../lib/supaBase'; 
import Card from './Card.vue';

const theme = useTheme();
const isDark = ref(theme.global.current.value.dark);

// Reactive variables to store car count and other data
const carCount = ref(0);
const totalCarsForRent = ref(0); 

// Function to fetch the number of cars for sale
const fetchCarCount = async () => {
  try {
    const { data, error } = await supabase
      .from('Car')
      .select('id') 
      .eq('forSale', true); 

    if (error) throw error;

    carCount.value = data.length;  
  } catch (err) {
    console.error("Error fetching car count:", err.message);
  }
};


onMounted(() => {
  fetchCarCount();  
});

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
// Logout handler
const handleLogout = async () => {
  try {
    await supabaseLogout(); // Use the imported logout function
    localStorage.removeItem('user_id');
    localStorage.removeItem('axios_id');
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<style>
.underline {
  text-decoration: underline;
}
#fonts {
  font-size: 1.2rem;
  font-family: "Merriweather", serif;
}
.bot {
  margin-top: -35px;
}
.tops{
  top: 350px;
}

</style>
