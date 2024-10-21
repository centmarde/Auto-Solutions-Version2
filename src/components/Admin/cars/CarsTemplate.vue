<template>
    <v-container>
      <h1 class="text-center fw-bolder">{{ title }}</h1>
      <v-table height="300px" fixed-header>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Brand</th>
            <th class="text-left">Model</th>
            <th class="text-left">Price</th>
            <th class="text-left">For Sale</th>
            <th class="text-left">For Rent</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in paginatedCars" :key="car.id">
            <td>{{ car.id }}</td>
            <td>{{ car.brand }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.price }}</td>
            <td>{{ car.for_sale }}</td>
            <td>{{ car.for_rent }}</td>
            <td>
              <v-btn class="mx-2" color="error" @click="confirmDelete(car.id)">Delete</v-btn>
              <v-btn  class="mx-2" color="success" @click="confirmApprove(car.id)">Approve</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      
      <!-- Pagination -->
      <v-pagination
        v-model="currentPage"
        :length="pageCount"
        :total-visible="7"
        @input="fetchCars"
      ></v-pagination>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { supabase } from '../../../lib/supaBase';
  
  const cars = ref([]);
  const currentPage = ref(1);
  const itemsPerPage = 5; // Adjust this number as needed
  
  const props = defineProps({
    title: {
      type: String,
      default: 'Title',
    },
    isadmin: {
      type: Boolean,
      default: false,
    },
  });
  
  // Fetch the cars from the database
  const fetchCars = async () => {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('is_pending', true);
  
    if (error) {
      console.error('Error fetching cars:', error);
    } else {
      cars.value = data;
    }
  };
  
  // Computed property for paginated cars
  const paginatedCars = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return cars.value.slice(start, start + itemsPerPage);
  });
  
  // Computed property for total page count
  const pageCount = computed(() => {
    return Math.ceil(cars.value.length / itemsPerPage);
  });
  
  // Confirm deletion
  const confirmDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this car?");
    if (confirm) {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);
  
      if (error) {
        console.error('Error deleting car:', error);
      } else {
        cars.value = cars.value.filter(car => car.id !== id);
      }
    }
  };
  
  // Confirm approval
  const confirmApprove = async (id) => {
    const confirm = window.confirm("Are you sure you want to approve this car?");
    if (confirm) {
      const { error } = await supabase
        .from('cars')
        .update({ is_pending: false })
        .eq('id', id);
  
      if (error) {
        console.error('Error approving car:', error);
      } else {
        cars.value = cars.value.filter(car => car.id !== id);
      }
    }
  };
  
  onMounted(() => {
    fetchCars();
  });
  </script>
  
  <style>
  .mts {
    margin-top: 40px;
  }
  </style>
  