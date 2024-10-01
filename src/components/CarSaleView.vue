<template>
  <div class="p-5 mt-5">
    <h1 class="text-center" id="fonts">Car In Sale</h1>

    <!-- Use Bootstrap's table-responsive class -->
    <div class="table-responsive">
      <table
        class="table table-dark table-hover"
        :class="{'navbar-dark': isDark, 'navbar-light': !isDark}"
        :style="{ backgroundColor: isDark ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: isDark ? '#fff' : '#333' }"
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Model</th>
            <th scope="col">Year</th>
            <th scope="col">Brand</th>
            <th scope="col">Mileage</th>
            <th scope="col">Engine</th>
            <th scope="col">HorsePower</th>
            <th scope="col">Torque</th>
            <th scope="col">Top Speed</th>
            <th scope="col">Years Owned</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(car, index) in cars" :key="car.id">
            <th scope="row">{{ index + 1 }}</th>
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { supabase } from '../lib/supaBase';
import { ref, onMounted } from 'vue';

const cars = ref([]);
const isDark = ref(false); 

const fetchCars = async () => {
  const { data, error } = await supabase.from('Car').select('*');
  if (error) {
    console.error('Error fetching cars:', error);
  } else {
    cars.value = data;
  }
};

onMounted(() => {
  fetchCars();

  const savedTheme = localStorage.getItem('theme') || 'light';
  isDark.value = savedTheme === 'dark';
});
</script>

<style>
.max {
  max-width: 1100px;
}

#fonts {
  margin-top: 30px;
  font-size: 1.2rem;
  font-family: "Merriweather", serif;
}
</style>
