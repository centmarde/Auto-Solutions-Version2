<template>
  <h2>Loan a Car</h2>
  <div class="loan-car-form">
    <form @submit.prevent="submitLoanRequest">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="loanRequest.name" required />
      </div>
      <div>
        <label for="carModel">Car Model:</label>
        <input type="text" v-model="loanRequest.carModel" required />
      </div>
      <div>
        <label for="duration">Loan Duration (months):</label>
        <input type="number" v-model="loanRequest.duration" required />
      </div>
      <div>
        <label for="income">Monthly Income:</label>
        <input type="number" v-model="loanRequest.income" required />
      </div>
      <button type="submit">Submit Loan Request</button>
    </form>
    <loan-request-table :requests="loanRequests" @remove="removeLoanRequest" />
  </div>
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
h2 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.loan-car-form {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 5%;
}
label {
  display: block;
  margin-top: 10px;
}
button {
  margin-top: 15px;
}
</style>
