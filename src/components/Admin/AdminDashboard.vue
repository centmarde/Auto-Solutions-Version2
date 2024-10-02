<template>
  
  <div class="w-100 d-flex h-100 gap-5 ">
    <Sidebar />
    <div class="d-flex justify-content-center gap-5 w-100 flex-wrap">

       <div class="row gap-5 justify-content-center mt">
        <Card class="col-6" title="Total Cars for Sale" link="/CarInSale" :num="carCount" />
        <Card class="col-6"  title="Total Cars for Rent" :num="totalCarsForRent" />
        <Card class="col-6"  title="Car purchased" />
        <Card class="col-6"  title="Car in rent" /> 
       </div>
 
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { useRoute } from 'vue-router';
import { supabase, doLogout as supabaseLogout } from '../../lib/supaBase'; 
import Card from './Card.vue';
import Sidebar from './Sidebar.vue';

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
.mt{
  margin-top: 100px;
}

</style>
