<template>
  <!-- Dialog for enlarged image -->
  <v-dialog id="front" v-model="dialog" max-width="600px">
    <v-card>
      <v-img
        :src="selectedImage"
        class="enlarged-image"
        aspect-ratio="16/9"
      ></v-img>
    </v-card>
  </v-dialog>
  <v-container class="p-5 mts">
    <h1 class="text-center fw-bolder">{{ title }}</h1>

    <v-table height="500px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Model</th>
          <th class="text-left">Image</th>
          <th class="text-left">Brand</th>
          <th class="text-left">Price</th>
          <th class="text-left">For Sale</th>
          <th class="text-left">For Rent</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in paginatedCars" :key="car.id">
          <td>{{ car.id }}</td>
          <td>{{ car.model }}</td>
          <td>
            <img
              :src="car.img"
              alt="Car Image"
              class="car-image"
              @click="openImage(car.img)"
            />
          </td>
          <td>{{ car.brand }}</td>
          <td>{{ formatPrice(car.price) }}</td>
          <td>{{ car.for_sale }}</td>
          <td>{{ car.for_rent }}</td>
          <td class="text-center">
            <div class="button-group">
              <v-btn class="mx-2 delete-button" @click="confirmDelete(car.id)"
                >Disapprove</v-btn
              >
              <v-btn class="mx-2 approve-button" @click="confirmApprove(car.id)"
                >Approve</v-btn
              >
            </div>
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
      class="mt-4"
    ></v-pagination>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "../../../lib/supaBase";

const cars = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
});

// State for dialog and selected image
const dialog = ref(false);
const selectedImage = ref("");

// Fetch cars from the database
const fetchCars = async () => {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("is_pending", true);

  if (error) {
    console.error("Error fetching cars:", error);
  } else {
    cars.value = data;
  }
};

// Format price as PHP currency
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
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

const confirmDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this car?");
  if (confirm) {
    // First, delete the related conversations
    const { error: conversationError } = await supabase
      .from("conversations")
      .delete()
      .eq("car_id", id);

    if (conversationError) {
      console.error("Error deleting related conversations:", conversationError);
      return;
    }

    // Second, delete the related loan_cars records
    const { error: loanCarError } = await supabase
      .from("loan_cars")
      .delete()
      .eq("car_id", id);

    if (loanCarError) {
      console.error("Error deleting related loan cars:", loanCarError);
      return;
    }

    // Then, delete the car
    const { error: carError } = await supabase
      .from("cars")
      .delete()
      .eq("id", id);

    if (carError) {
      console.error("Error deleting car:", carError);
    } else {
      cars.value = cars.value.filter((car) => car.id !== id);
    }
  }
};

// Confirm approval
const confirmApprove = async (id) => {
  const confirm = window.confirm("Are you sure you want to approve this car?");
  if (confirm) {
    const { error } = await supabase
      .from("cars")
      .update({ is_pending: false })
      .eq("id", id);

    if (error) {
      console.error("Error approving car:", error);
    } else {
      cars.value = cars.value.filter((car) => car.id !== id);
    }
  }
};

// Open image in dialog
const openImage = (img) => {
  selectedImage.value = img;
  dialog.value = true;
};

onMounted(() => {
  fetchCars();
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
.delete-button {
  background-color: #ff6962 !important;
  color: white !important;
}

.approve-button {
  background-color: #77dd76 !important;
  color: white !important;
}
.button-group {
  display: flex;
  gap: 8px; /* Adjust space between buttons */
  justify-content: center; /* Center align buttons */
}
</style>
