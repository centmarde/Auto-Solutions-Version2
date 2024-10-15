<template>
  <v-container class="p-5 mts">
    <h1 class="text-center fw-bolder">{{ title }}</h1>
    <v-table height="300px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Model</th>
          <th class="text-left">Year</th>
          <th class="text-left">Brand</th>
          <th class="text-left">Mileage</th>
          <th class="text-left">Engine</th>
          <th class="text-left">HorsePower</th>
          <th class="text-left">Torque</th>
          <th class="text-left">Top Speed</th>
          <th class="text-left">Years Owned</th>
          <th class="text-left">Price</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(car, index) in cars" :key="car.id">
          <td>{{ index + 1 }}</td>
          <td>{{ car.model }}</td>
          <td>{{ car.year }}</td>
          <td>{{ car.brand }}</td>
          <td>{{ car.mileage }}</td>
          <td>{{ car.engine }}</td>
          <td>{{ car.horsepower }}</td>
          <td>{{ car.torque }}</td>
          <td>{{ car.topSpeed }}</td>
          <td>{{ car.yearsowned }}</td>
          <td>{{ car.price }}</td>
          <td>
            <v-btn color="error" @click="confirmDelete(car.id)">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>


  
<script setup>
import { ref, onMounted, watch } from 'vue';
import { supabase } from '../../lib/supaBase';

const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  tableName: {
    type: String,
    required: true,
  },
  forRent: {
    type: Boolean,
    default: false,
  },
});

const cars = ref([]);
const isDark = ref(false);

const fetchCars = async (table, forRent = false) => {
  const query = supabase.from(table).select('*');
  if (forRent) {
    query.eq('forRent', true); 
  }
  const { data, error } = await query;
  if (error) {
    console.error('Error fetching cars:', error);
  } else {
    cars.value = data;
  }
};

const deleteCar = async (carId) => {
  const { error } = await supabase.from(props.tableName).delete().eq('id', carId);
  if (error) {
    console.error('Error deleting car:', error);
  } else {
    // Remove the deleted car from the local array
    cars.value = cars.value.filter(car => car.id !== carId);
  }
};
// Show confirmation dialog before deleting
const confirmDelete = (carId) => {
  const confirmed = confirm("Are you sure you want to delete this car?");
  if (confirmed) {
    deleteCar(carId);  
  }
};

onMounted(() => {
  fetchCars(props.tableName, props.forRent);
  const savedTheme = localStorage.getItem('theme') || 'light';
  isDark.value = savedTheme === 'dark';
});

watch(() => [props.tableName, props.forRent], ([newTable, newForRent]) => {
  fetchCars(newTable, newForRent); 
});
</script>


  
  <style>
  .max {
    max-width: 1100px;
  }
  
  .mts {
    margin-top: 40px;
  }
  </style>
  