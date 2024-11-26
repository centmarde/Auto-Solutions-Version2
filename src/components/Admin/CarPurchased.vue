<template>
  <v-container class="p-5 mts">
    <h1 class="text-center fw-bolder">{{ title }}</h1>

    <v-table height="500px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Car ID</th>
          <th class="text-left">Buyer ID</th>
          <th class="text-left">Seller ID</th>
          <th class="text-left">Image</th>
          <th class="text-left">Price</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in paginatedCars" :key="car.car_id">
          <td>{{ car.car_id }}</td>
          <td>{{ car.buyer_id }}</td>
          <td>{{ car.seller_id }}</td>
          <td>
            <img
              :src="car.img"
              alt="Car Image"
              class="car-image"
              @click="openImage(car.img)"
            />
          </td>
          <td>{{ car.price }}</td>
          <td class="text-center">
            <v-btn color="warning" @click="openDisapproveDialog(car)"
              >Disapprove</v-btn
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

    <!-- Confirmation Dialog for Disapproving a Car -->
    <v-dialog v-model="disapproveDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirm Disapproval</v-card-title>
        <v-card-text>
          Are you sure you want to disapprove this car ({{
            selectedCar?.model
          }})? It will be permanently removed from purchased cars.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="disapproveDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="red darken-1" text @click="confirmDisapprove"
            >Disapprove</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "../../lib/supaBase";

const props = defineProps({
  title: {
    type: String,
    default: "Purchased Cars",
  },
});

const cars = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

// State for dialog and selected image
const dialog = ref(false);
const selectedImage = ref("");

// State for disapprove confirmation dialog
const disapproveDialog = ref(false);
const selectedCar = ref(null);

// Fetch only cars from purchased_cars table with related details from cars and transactions tables
const fetchCars = async () => {
  // Query purchased_cars table and join with cars and transactions details
  const { data: purchasedCarsData, error } = await supabase.from(
    "purchased_cars"
  ).select(`
      car_id,
      cars (id, model, img, price),
      transactions (buyer_id, seller_id)
    `);

  if (error) {
    console.error("Error fetching purchased cars:", error);
    return;
  }

  // Map the fetched data to include car and transaction details
  cars.value = purchasedCarsData.map((item) => ({
    car_id: item.car_id,
    model: item.cars.model,
    img: item.cars.img,
    price: item.cars.price,
    buyer_id: item.transactions.buyer_id,
    seller_id: item.transactions.seller_id,
  }));
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

// Open disapprove confirmation dialog
const openDisapproveDialog = (car) => {
  selectedCar.value = car;
  disapproveDialog.value = true;
};

// Confirm disapprove and remove car from purchased_cars table
const confirmDisapprove = async () => {
  if (!selectedCar.value) return;

  const carId = selectedCar.value.car_id;

  // Delete the car from purchased_cars table
  const { error } = await supabase
    .from("purchased_cars")
    .delete()
    .eq("car_id", carId);

  if (error) {
    console.error("Error disapproving car:", error);
    return;
  }

  // Remove the car from the local state
  cars.value = cars.value.filter((car) => car.car_id !== carId);

  // Close the dialog
  disapproveDialog.value = false;
  selectedCar.value = null;
};

// Confirm delete function (to be implemented)
const confirmDelete = (carId) => {
  // Logic for deleting a car
  console.log("Delete car with ID:", carId);
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
