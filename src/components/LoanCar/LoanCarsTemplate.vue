<template>
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

  <v-container class="p-5 mts">
    <h1 class="text-center fw-bolder">{{ title }}</h1>

    <v-table height="500px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Loan ID</th>
          <th class="text-left">Car Model</th>
          <th class="text-left">Car Image</th>
          <th class="text-left">Loan Duration</th>
          <th class="text-left">Monthly Income</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in paginatedLoans" :key="loan.id">
          <td>{{ loan.id }}</td>
          <td>{{ loan.model }} {{ loan.brand }}</td>
          <td>
            <img
              :src="loan.car_image"
              alt="Car Image"
              class="car-image"
              @click="openImage(loan.car_image)"
            />
          </td>
          <td>{{ loan.loan_duration }} months</td>
          <td>
            ${{
              loan.monthly_income.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </td>
          <td>
            <v-btn class="mx-2" color="error" @click="confirmDelete(loan.id)">
              Delete
            </v-btn>
            <v-btn
              class="mx-2"
              color="success"
              @click="confirmApprove(loan.id)"
            >
              Approve
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination -->
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      :total-visible="7"
      @input="fetchLoans"
      class="mt-4"
    ></v-pagination>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "C:/Web dev/Auto-sol/Auto-Solutions-Version2/src/lib/supaBase.js";

const loans = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

const props = defineProps({
  title: {
    type: String,
    default: "Loan Requests Overview",
  },
});

// State for dialog and selected image
const dialog = ref(false);
const selectedImage = ref("");

// Fetch loan requests from the database
const fetchLoans = async () => {
  try {
    // Fetch loan cars along with the related car details
    const { data: loanData, error: loanError } = await supabase
      .from("loan_cars")
      .select("id, model, brand, loan_duration, monthly_income, car_id");

    if (loanError) throw loanError;

    // Fetch car details (images) from the cars table
    const { data: carData, error: carError } = await supabase
      .from("cars")
      .select("id, img");

    if (carError) throw carError;

    // Map car image to the respective loan
    loans.value = loanData.map((loan) => {
      const car = carData.find((car) => car.id === loan.car_id);
      return { ...loan, car_image: car?.img || "" };
    });
  } catch (error) {
    console.error("Error fetching loan requests or car data:", error);
  }
};

// Paginated loan requests based on current page
const paginatedLoans = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return loans.value.slice(start, start + itemsPerPage);
});

// Calculate total number of pages
const pageCount = computed(() => {
  return Math.ceil(loans.value.length / itemsPerPage);
});

// Confirm deletion
const confirmDelete = async (id) => {
  const confirm = window.confirm(
    "Are you sure you want to delete this loan request?"
  );
  if (confirm) {
    const { error } = await supabase.from("loan_cars").delete().eq("id", id);

    if (error) {
      console.error("Error deleting loan request:", error);
    } else {
      loans.value = loans.value.filter((loan) => loan.id !== id);
    }
  }
};

// Confirm approval
const confirmApprove = async (id) => {
  const confirm = window.confirm(
    "Are you sure you want to approve this loan request?"
  );
  if (confirm) {
    const { error } = await supabase
      .from("loan_cars")
      .update({ is_approved: true })
      .eq("id", id);

    if (error) {
      console.error("Error approving loan request:", error);
    } else {
      loans.value = loans.value.filter((loan) => loan.id !== id);
    }
  }
};

// Open image in dialog
const openImage = (img) => {
  selectedImage.value = img;
  dialog.value = true;
};

onMounted(() => {
  fetchLoans();
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
</style>
