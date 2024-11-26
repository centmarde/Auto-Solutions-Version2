<template>
  <AdminSlots>
    <template #admin>
      <v-container class="p-5 mts">
        <h1 class="text-center fw-bolder">{{ title }}</h1>

        <!-- Table to display unpaid cars -->
        <v-table height="500px" fixed-header>
          <thead>
            <tr>
              <th class="text-left">User ID</th>
              <th class="text-left">Model</th>
              <th class="text-left">Image</th>
              <th class="text-left">Date Start</th>
              <th class="text-left">Date End</th>
              <th class="text-left">Total Days</th>
              <th class="text-left">Is Paid</th>
              <th class="text-left">Total Amount</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="car in paginatedCars" :key="car.id">
              <td>{{ car.user_id }}</td>
              <td>{{ car.model }}</td>
              <td>
                <img
                  :src="car.img"
                  alt="Car Image"
                  class="car-image"
                  @click="openImage(car.img)"
                />
              </td>
              <td>{{ car.date_start }}</td>
              <td>{{ car.date_end }}</td>
              <td>{{ car.total_days }}</td>
              <td>{{ car.is_paid ? "Yes" : "No" }}</td>
              <td>{{ car.total_amount }}</td>
              <td class="text-center">
                <v-btn color="error" @click="confirmDelete(car.id)"
                  >Delete</v-btn
                >
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
  </AdminSlots>
</template>

<script setup>
import AdminSlots from "@/components/Admin/AdminSlots.vue";
import { ref, onMounted, computed } from "vue";
import { supabase } from "../../lib/supaBase";

const props = defineProps({
  title: {
    type: String,
    default: "Unpaid Cars",
  },
});

const cars = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

// State for dialog and selected image
const dialog = ref(false);
const selectedImage = ref("");

// Fetch cars from rented_cars and purchased_cars where is_paid is false
const fetchCars = async () => {
  const { data: rentedCarsData, error: rentedError } = await supabase
    .from("rented_cars")
    .select(
      `
      id,
      date_start,
      date_end,
      total_days,
      is_paid,
      total_amount,
      cars (model, img),
      transactions (buyer_id)
    `
    )
    .eq("is_paid", false);

  const { data: purchasedCarsData, error: purchasedError } = await supabase
    .from("purchased_cars")
    .select(
      `
      car_id,
      cars (model, img, price),
      transactions (buyer_id)
    `
    )
    .eq("is_paid", false);

  if (rentedError || purchasedError) {
    console.error("Error fetching unpaid cars:", rentedError || purchasedError);
    return;
  }

  // Combine both rented and purchased cars data
  const combinedCars = [
    ...rentedCarsData.map((item) => ({
      id: item.id,
      model: item.cars.model,
      img: item.cars.img,
      date_start: item.date_start,
      date_end: item.date_end,
      total_days: item.total_days,
      is_paid: item.is_paid,
      total_amount: item.total_amount,
      user_id: item.transactions.buyer_id,
    })),
    ...purchasedCarsData.map((item) => ({
      id: item.car_id,
      model: item.cars.model,
      img: item.cars.img,
      date_start: item.date_start,
      date_end: item.date_end,
      total_days: item.total_days, // Optional, may not exist in purchased_cars
      is_paid: item.is_paid,
      total_amount: item.cars.price, // Assuming price is the total amount for purchased cars
      user_id: item.transactions.buyer_id,
    })),
  ];

  // Set combined cars data to the reactive cars array
  cars.value = combinedCars;
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

// Open image in dialog
const openImage = (img) => {
  selectedImage.value = img;
  dialog.value = true;
};

// Confirm and delete a car record (functionality to be implemented)
const confirmDelete = async (carId) => {
  if (confirm("Are you sure you want to delete this record?")) {
    // Delete logic for unpaid car
    console.log("Deleting car with ID:", carId);
  }
};

onMounted(async () => {
  await fetchCars();
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

.enlarged-image {
  width: 100%;
  height: auto;
}
</style>
