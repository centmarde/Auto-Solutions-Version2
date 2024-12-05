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
          <th class="text-center">Actions</th>
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
            {{
              loan.monthly_income.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
            PHP
          </td>
          <td>{{ loan.user_id }}</td>
          <td>{{ loan.car_id }}</td>
          <td class="text-center">
            <!-- Conditionally render Success and Failed buttons -->
            <div v-if="loan.is_approved === false && loan.is_failed === false">
              <v-btn color="success" @click="markAsApproved(loan)"
                >Success</v-btn
              >
              <v-btn color="error" @click="markAsFailed(loan)">Failed</v-btn>
            </div>

            <!-- Failed Text -->
            <div v-if="loan.is_failed">
              <span class="failed-text">The requirements have failed</span>
            </div>

            <!-- Approved Text -->
            <div v-else-if="loan.is_approved">
              <span class="completed-text">The requirements are completed</span>
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
    const { data: loanData, error: loanError } = await supabase
      .from("approved_loans")
      .select(
        "id, loan_id, model, brand, loan_duration, monthly_income, car_image, user_id, car_id, is_approved, is_failed"
      );

    if (loanError) throw loanError;

    // Ensure is_approved and is_failed are not undefined
    approvedLoans.value = loanData.map((loan) => ({
      ...loan,
      is_approved: loan.is_approved !== undefined ? loan.is_approved : false,
      is_failed: loan.is_failed !== undefined ? loan.is_failed : false,
    }));
  } catch (error) {
    console.error("Error fetching approved loans:", error);
  }
};

// Method to mark a loan as approved
const markAsApproved = async (loan) => {
  try {
    const { error } = await supabase
      .from("approved_loans")
      .update({ is_approved: true, is_failed: false }) // Mark as approved and ensure 'is_failed' is false
      .eq("id", loan.id);

    if (error) throw error;

    // Update the loan in the local state
    const loanIndex = approvedLoans.value.findIndex(
      (item) => item.id === loan.id
    );
    if (loanIndex !== -1) {
      approvedLoans.value[loanIndex].is_approved = true;
      approvedLoans.value[loanIndex].is_failed = false;
    }
  } catch (error) {
    console.error("Error updating loan status:", error);
  }
};

// Method to mark a loan as failed
const markAsFailed = async (loan) => {
  try {
    const { error } = await supabase
      .from("approved_loans")
      .update({ is_failed: true, is_approved: false }) // Mark as failed and ensure 'is_approved' is false
      .eq("id", loan.id);

    if (error) throw error;

    // Update the loan in the local state
    const loanIndex = approvedLoans.value.findIndex(
      (item) => item.id === loan.id
    );
    if (loanIndex !== -1) {
      approvedLoans.value[loanIndex].is_failed = true;
      approvedLoans.value[loanIndex].is_approved = false;
    }
  } catch (error) {
    console.error("Error updating loan status to failed:", error);
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

.completed-text {
  color: green;
  font-weight: bold;
}

.failed-text {
  color: red;
  font-weight: bold;
}
</style>
