<template>
  <v-row>
    <!-- Loading indicator while fetching data -->
    <v-col v-if="loading" cols="12">
      <v-progress-circular indeterminate color="primary" />
    </v-col>

    <!-- Error message if something goes wrong -->
    <v-col v-if="error" cols="12">
      <v-alert type="error" dense>
        {{ error }}
      </v-alert>
    </v-col>

    <!-- Loop through loanCarsWithStatus to display each car's details -->
    <v-col
      v-for="item in loanCarsWithStatus"
      :key="item.car.id"
      cols="12"
      md="6"
      class="mb-4"
    >
      <v-card elevation="8">
        <v-row no-gutters>
          <v-col cols="4">
            <v-img
              v-if="item.car.img"
              :src="item.car.img"
              alt="Car Image"
              class="img-fluid rounded-start"
              cover
              height="180px"
            ></v-img>
          </v-col>

          <v-col cols="8">
            <v-card-title>
              {{ item.car.brand }} {{ item.car.model }}
            </v-card-title>
            <v-card-text>
              <p class="truncate-text">{{ item.car.description }}</p>
              <p>
                <small class="text-body-secondary">
                  Added at: {{ item.car.created_at }}
                </small>
              </p>
              <p>
                <!-- Display loan status with appropriate alerts -->
                <v-alert
                  v-if="item.loanStatus === 'approved'"
                  type="success"
                  dense
                >
                  Loaned Car successfully
                </v-alert>
                <v-alert
                  v-else-if="item.loanStatus === 'conditionallyApproved'"
                  type="info"
                  dense
                >
                  Your loan request has been approved! Please bring proof of
                  income and 2 valid IDs to the physical store.
                </v-alert>
                <v-alert v-else type="warning" dense>
                  Your loan request is pending.
                </v-alert>
              </p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { supabase } from "../../lib/supaBase";

export default {
  data() {
    return {
      loanCarsWithStatus: [], // Stores car details and loan status
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchLoanCars();
  },
  methods: {
    async fetchLoanCars() {
      this.loading = true;
      this.error = null;

      try {
        const loggedInUserId = localStorage.getItem("user_id");

        if (!loggedInUserId) {
          this.error = "Network error, please login again";
          this.loading = false;
          return;
        }

        // Fetch loan cars data from the loan_cars table
        const { data: loanCars, error: loanCarsError } = await supabase
          .from("loan_cars")
          .select("car_id")
          .eq("user_id", loggedInUserId);

        if (loanCarsError) throw loanCarsError;

        // Fetch approved loans data from the approved_loans table
        const { data: approvedLoans, error: approvedLoansError } =
          await supabase
            .from("approved_loans")
            .select("car_id, is_approved")
            .eq("user_id", loggedInUserId);

        if (approvedLoansError) throw approvedLoansError;

        // Fetch only the cars that are either loaned or approved for the user
        const loanCarIds = loanCars.map((loanCar) => loanCar.car_id);
        const approvedLoanCarIds = approvedLoans.map(
          (approvedLoan) => approvedLoan.car_id
        );
        const allCarIds = [...new Set([...loanCarIds, ...approvedLoanCarIds])];

        const { data: cars, error: carsError } = await supabase
          .from("cars")
          .select("*")
          .in("id", allCarIds);

        if (carsError) throw carsError;

        // Map cars data to add loan status based on loan_cars and approved_loans
        this.loanCarsWithStatus = cars.map((car) => {
          const approvedLoan = approvedLoans.find(
            (approvedLoan) => approvedLoan.car_id === car.id
          );
          const loanStatus = approvedLoan
            ? approvedLoan.is_approved
              ? "approved"
              : "conditionallyApproved"
            : loanCars.some((loanCar) => loanCar.car_id === car.id)
            ? "pending"
            : null;

          return { car, loanStatus };
        });
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
}

.v-card-text {
  padding: 16px;
}

.truncate-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v-alert {
  margin-top: 10px;
}
</style>
