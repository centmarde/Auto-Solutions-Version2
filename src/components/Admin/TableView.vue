<template>
  <v-container class="p-5 mts">
    <h1 class="text-center fw-bolder">{{ title }}</h1>

    <v-table height="500px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Model</th>
          <th class="text-left">Image</th>
          <th class="text-left">Year</th>
          <th class="text-left">Brand</th>
          <th class="text-left">Mileage</th>
          <th class="text-left">Engine</th>
          <th class="text-left">HorsePower</th>
          <th class="text-left">Torque</th>
          <th class="text-left">Top Speed</th>
          <th class="text-left">Years Owned</th>
          <th class="text-left">Price</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(car, index) in paginatedCars" :key="car.id">
          <td>{{ index + 1 }}</td>
          <td>{{ car.model }}</td>
          <td>
            <img
              :src="car.img"
              alt="Car Image"
              class=" car-image "
              style="cursor: pointer;"
              @click="openImage(car.img)"
            />
          </td>
          <td>{{ car.year }}</td>
          <td>{{ car.brand }}</td>
          <td>{{ car.mileage }}</td>
          <td>{{ car.engine }}</td>
          <td>{{ car.horsepower }}</td>
          <td>{{ car.torque }}</td>
          <td>{{ car.topSpeed }}</td>
          <td>{{ car.yearsowned }}</td>
          <td>{{ car.price }}</td>
          <td class="text-center">
            <v-btn class="mx-2" color="error" @click="confirmDelete(car.id)">Delete</v-btn>
            <v-btn class="mx-2" color="warning" @click="confirmDisapprove(car.id)">Disapprove</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination -->
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      :total-visible="4"
      @input="fetchCars"
      class="mt-4"
    ></v-pagination>

    <!-- Dialog for enlarged image -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-img :src="selectedImage" class="enlarged-image" aspect-ratio="16/9"></v-img>
      </v-card>
    </v-dialog>
  </v-container>
</template>



<script setup>
import { ref, onMounted, watch, computed } from 'vue';
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
  is_pending: {
    type: Boolean,
    default: false,
  },
});

const cars = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5; 
const totalCarsForSale = ref(0);
const totalCarsForRent = ref(0);

// State for dialog and selected image
const dialog = ref(false);
const selectedImage = ref('');

const fetchCars = async (table, forRent = false) => {
  const query = supabase
    .from(table)
    .select('*')
    .eq('is_pending', false);

  if (forRent) {
    query.eq('for_rent', true); 
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching cars:', error);
  } else {
    cars.value = data;
    calculateTotals();
  }
};

const calculateTotals = () => {
  totalCarsForSale.value = cars.value.filter(car => car.for_sale).length;
  totalCarsForRent.value = cars.value.filter(car => car.for_rent).length;
};

// Paginated cars based on current page
const paginatedCars = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return cars.value.slice(start, start + itemsPerPage);
});

// Calculate total number of pages
const pageCount = computed(() => {
  return Math.ceil(cars.value.length / itemsPerPage);
});

const deleteCar = async (carId) => {
  const { error } = await supabase.from(props.tableName).delete().eq('id', carId);
  if (error) {
    console.error('Error deleting car:', error);
  } else {
    cars.value = cars.value.filter(car => car.id !== carId);
    calculateTotals();
  }
};

const disapproveCar = async (carId) => {
  const { error } = await supabase
    .from(props.tableName)
    .update({ is_pending: true })
    .eq('id', carId);
  if (error) {
    console.error('Error disapproving car:', error);
  } else {
    alert('Car has been disapproved successfully.');
    fetchCars(props.tableName, props.forRent);
  }
};

const confirmDelete = (carId) => {
  const confirmed = confirm("Are you sure you want to delete this car?");
  if (confirmed) {
    deleteCar(carId);  
  }
};

const confirmDisapprove = (carId) => {
  const confirmed = confirm("Are you sure you want to disapprove this car?");
  if (confirmed) {
    disapproveCar(carId);
  }
};

// Open image in dialog
const openImage = (img) => {
  selectedImage.value = img;
  dialog.value = true;
};

onMounted(async () => {
  await fetchCars(props.tableName, props.forRent);
});

watch(() => [props.tableName, props.forRent], async ([newTable, newForRent]) => {
  await fetchCars(newTable, newForRent);
});
</script>




<style>
.mts {
  margin-top: 40px;
}

.car-image {
  cursor: pointer;
  width: 100px;
  height: auto;
  transition: transform 0.3s;
}

.car-image:hover {
  transform: scale(1.05);
}

#front {
  z-index: 9999;
}
</style>
