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
          <th class="text-left">User ID</th>
          <th class="text-left">Car ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in paginatedApprovedLoans" :key="loan.id">
          <td>{{ loan.loan_id }}</td>
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
          <td>{{ loan.user_id }}</td>
          <td>{{ loan.car_id }}</td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination -->
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      :total-visible="7"
      @input="fetchApprovedLoans"
      class="mt-4"
    ></v-pagination>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "../../../src/lib/supaBase.js";

const approvedLoans = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

const props = defineProps({
  title: {
    type: String,
    default: "Approved Loans Overview",
  },
});

// State for dialog and selected image
const dialog = ref(false);
const selectedImage = ref("");

// Fetch approved loans from the database
const fetchApprovedLoans = async () => {
  try {
    // Fetch approved loans along with the related car details, including user_id
    const { data: loanData, error: loanError } = await supabase
      .from("approved_loans")
      .select(
        "id, loan_id, model, brand, loan_duration, monthly_income, car_image, user_id, car_id"
      );

    if (loanError) throw loanError;

    // Map approved loan details to display
    approvedLoans.value = loanData;
  } catch (error) {
    console.error("Error fetching approved loans:", error);
  }
};

// Paginated approved loans based on current page
const paginatedApprovedLoans = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return approvedLoans.value.slice(start, start + itemsPerPage);
});

// Calculate total number of pages
const pageCount = computed(() => {
  return Math.ceil(approvedLoans.value.length / itemsPerPage);
});

// Open image in dialog
const openImage = (img) => {
  selectedImage.value = img;
  dialog.value = true;
};

onMounted(() => {
  fetchApprovedLoans();
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
