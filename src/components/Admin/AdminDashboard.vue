<template>
  <div class="w-100 d-flex h-100 gap-5">
    <Sidebar />
    <div class="d-flex justify-content-center gap-5 w-100 flex-wrap mb-6">
      <div class="row gap-5 justify-content-center mt">
       
        <canvas id="barChart" width="400" height="150"></canvas>
        <Card class="col-6" title="Total Cars for Sale" link="/CarInSale" :num="carCount" />
        <Card class="col-6" title="Total Cars for Rent" link="/CarInRent" :num="totalCarsForRent" />
        <Card class="col-6" title="Car Purchased" link="/CarBeenPurchased" :num="purchasedCount" />
        <Card class="col-6" title="Car Rented" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart } from 'chart.js';
import { useTheme } from 'vuetify';
import { supabase, doLogout as supabaseLogout } from '../../lib/supaBase'; 
import Card from './Card.vue';
import Sidebar from './Sidebar.vue';

const theme = useTheme();
let chartInstance = null;

const carCount = ref(0);
const totalCarsForRent = ref(0); 
const purchasedCount = ref(0);

const fetchCarCount = async () => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('id') 
      .eq('for_sale', true)
      .eq('is_pending', false); 

    if (error) throw error;

    carCount.value = data.length;  
  } catch (err) {
    console.error("Error fetching car count:", err.message);
  }
};

const fetchtotalCarsForRent = async () => {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('id') 
      .eq('for_rent', true)
      .eq('is_pending', false);

    if (error) throw error;

    totalCarsForRent.value = data.length;  
  } catch (err) {
    console.error("Error fetching car count:", err.message);
  }
};

const fetchtotalCarsPurchased = async () => {
  try {
    const { data, error } = await supabase
      .from('purchased_cars')
      .select('*');

    if (error) throw error;

    purchasedCount.value = data.length;  
  } catch (err) {
    console.error("Error fetching car count:", err.message);
  }
};

const initializeBarChart = () => {
  const ctx = document.getElementById('barChart').getContext('2d');

  const textColor = theme.global.current.value.dark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.8)';

  const data = {
    labels: ['For Sale', 'For Rent'],
    datasets: [{
      label: 'Total Cars',
      data: [carCount.value, totalCarsForRent.value],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColor
          },
          grid: {
            color: theme.global.current.value.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' 
          }
        },
        x: {
          ticks: {
            color: textColor 
          },
          grid: {
            color: theme.global.current.value.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' 
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: textColor 
          }
        }
      }
    }
  };

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, config);
};

onMounted(async () => {
  await fetchCarCount();  
  await fetchtotalCarsForRent();
  await fetchtotalCarsPurchased();
  initializeBarChart(); 
});

watch(() => theme.global.current.value.dark, () => {
  initializeBarChart();
});

const toggleTheme = () => {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark';
  theme.global.name.value = newTheme;
  localStorage.setItem('theme', newTheme);
};

// Logout handler
const handleLogout = async () => {
  try {
    await supabaseLogout(); 
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
.tops {
  top: 350px;
}
.mt {
  margin-top: 100px;
}
</style>
