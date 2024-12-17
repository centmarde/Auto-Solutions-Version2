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
              class="car-image"
              style="cursor: pointer"
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
          <td>{{ formatPrice(car.price) }}</td>
          <td class="text-center">
            <v-btn class="mx-2 delete-button" @click="confirmDisapprove(car)">
              Disapprove
            </v-btn>
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
        <v-img
          :src="selectedImage"
          class="enlarged-image"
          aspect-ratio="16/9"
        ></v-img>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { supabase } from "../../lib/supaBase";

const props = defineProps({
  title: {
    type: String,
    default: "Title",
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
  checkRented: {
    type: Boolean,
    default: false,
  },
});

const cars = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

// State for dialog and selected image
const dialog = ref(false);
const selectedImage = ref("");

// Fetch cars
const fetchCars = async (table, forRent = false) => {
  let query = supabase.from(table).select("*").eq("is_pending", false);

  if (forRent) {
    query = query.eq("for_rent", true);
  }

  if (props.checkRented) {
    const rentedCarsQuery = await supabase
      .from("rented_cars")
      .select("cars_id");
    if (rentedCarsQuery.error) {
      console.error("Error fetching rented cars:", rentedCarsQuery.error);
      return;
    }

    const rentedCarIds = rentedCarsQuery.data.map((car) => car.cars_id);
    query = query.in("id", rentedCarIds);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching cars:", error);
  } else {
    cars.value = data;
  }
};

// Log activity
const logActivity = async (action) => {
  const adminId = localStorage.getItem("user_id");
  if (!adminId) {
    console.error("Admin ID not found in localStorage.");
    return;
  }

  const { error } = await supabase.from("activity_logs").insert({
    user_id: adminId,
    action,
    timestamp: new Date().toISOString(),
  });

  if (error) {
    console.error("Error logging activity:", error.message);
  }
};

// Disapprove car
const disapproveCar = async (car) => {
  const { error } = await supabase
    .from(props.tableName)
    .update({ is_pending: true })
    .eq("id", car.id);

  if (error) {
    console.error("Error disapproving car:", error);
  } else {
    await logActivity(`Disapproved car with ID ${car.id}.`);
    alert("Car has been disapproved successfully.");
    fetchCars(props.tableName, props.forRent);
  }
};

// Confirm disapproval
const confirmDisapprove = (car) => {
  const confirmed = confirm("Are you sure you want to disapprove this car?");
  if (confirmed) {
    disapproveCar(car);
  }
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

// Format price as PHP currency
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

// Open image in dialog
const openImage = (img) => {
  selectedImage.value = img;
  dialog.value = true;
};

onMounted(async () => {
  await fetchCars(props.tableName, props.forRent);
});

watch(
  () => [props.tableName, props.forRent],
  async ([newTable, newForRent]) => {
    await fetchCars(newTable, newForRent);
  }
);
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

.delete-button {
  background-color: #ff6962 !important;
  color: white !important;
}
</style>
