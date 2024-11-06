<template>
  <v-card class="mx-auto my-10 px-10" elevation="16" max-width="800">
    <v-card-item>
      <v-card-title> Loan a Car </v-card-title>
      <v-card-subtitle> Get a car loan quickly and easily </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      Please fill out the form below to submit a loan request. Our team will
      review your application and get back to you as soon as possible.
    </v-card-text>

    <div class="loan-car-form">
      <form @submit.prevent="submitLoanRequest">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="loanRequest.name" required />
        </div>
        <div class="form-group">
          <label for="carModel">Car Model:</label>
          <input type="text" v-model="loanRequest.carModel" required />
        </div>
        <div class="form-group">
          <label for="duration">Loan Duration (months):</label>
          <input type="number" v-model="loanRequest.duration" required />
        </div>
        <div class="form-group">
          <label for="income">Monthly Income:</label>
          <input type="number" v-model="loanRequest.income" required />
        </div>
        <div class="form-group">
          <button type="submit" class="centered-button">
            Submit Loan Request
          </button>
        </div>
      </form>

      <loan-request-table
        :requests="loanRequests"
        @remove="removeLoanRequest"
      />
    </div>
  </v-card>
</template>

<script>
import LoanRequestTable from "./LoanRequestTable.vue";

export default {
  components: { LoanRequestTable },
  data() {
    return {
      loanRequest: {
        name: "",
        carModel: "",
        duration: "",
        income: "",
      },
      loanRequests: [],
    };
  },
  mounted() {
    this.loadLoanRequests();
  },
  methods: {
    submitLoanRequest() {
      this.loanRequests.push({ ...this.loanRequest });
      this.saveLoanRequests();
      this.loanRequest = { name: "", carModel: "", duration: "", income: "" };
    },
    removeLoanRequest(index) {
      this.loanRequests.splice(index, 1);
      this.saveLoanRequests();
    },
    saveLoanRequests() {
      localStorage.setItem("loanRequests", JSON.stringify(this.loanRequests));
    },
    loadLoanRequests() {
      const savedLoans = localStorage.getItem("loanRequests");
      if (savedLoans) {
        this.loanRequests = JSON.parse(savedLoans);
      }
    },
  },
};
</script>

<style scoped>
.loan-car-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 3%;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

label {
  text-align: center;
  font-weight: bold;
  width: 100%;
  margin-bottom: 5px;
}

.centered-button {
  align-self: center;
  margin-top: 15px;
  border-radius: 7px;
  padding: 8px 16px;
  background-color: royalblue;
}

.centered-button:hover {
  background-color: rgb(7, 42, 147);
}

input {
  border: 2px solid white;
  width: 100%;
  padding: 5px;
}
</style>
