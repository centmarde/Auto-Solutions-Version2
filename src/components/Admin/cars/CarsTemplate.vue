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
              <v-btn class="mx-2 delete-button" @click="confirmDelete(car)"
                >Disapprove</v-btn
              >
              <v-btn class="mx-2 approve-button" @click="confirmApprove(car)"
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
    .eq("is_pending", true)
    .eq("is_disapproved", false);

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

// Confirm and disapprove a car
const confirmDelete = async (car) => {
  const confirm = window.confirm(
    "Are you sure you want to disapprove this car?"
  );
  if (confirm) {
    const { error } = await supabase
      .from("cars")
      .update({ is_disapproved: true }) // Set is_disapproved to true
      .eq("id", car.id);

    if (error) {
      console.error("Error disapproving car:", error);
    } else {
      await logActivity(`Disapproved car with ID ${car.id}.`);
      cars.value = cars.value.filter((c) => c.id !== car.id);
      console.log("Car successfully disapproved");
    }
  }
};

// Confirm approval
const confirmApprove = async (car) => {
  const confirm = window.confirm("Are you sure you want to approve this car?");
  if (confirm) {
    const { error } = await supabase
      .from("cars")
      .update({ is_pending: false })
      .eq("id", car.id);

    if (error) {
      console.error("Error approving car:", error);
    } else {
      await logActivity(`Approved car with ID ${car.id}.`);
      cars.value = cars.value.filter((c) => c.id !== car.id);
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
