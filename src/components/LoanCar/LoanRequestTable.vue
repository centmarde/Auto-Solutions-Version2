<template>
  <div class="loan-request-table">
    <h3>Submitted Loan Requests</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Car Model</th>
          <th>Duration</th>
          <th>Monthly Income</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request, index) in requests" :key="index">
          <td>{{ request.name }}</td>
          <td>{{ request.carModel }}</td>
          <td>{{ request.duration }} months</td>
          <td>${{ request.income }}</td>
          <td><button @click="$emit('remove', index)">Remove</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    requests: Array,
  },
};
</script>

<style scoped>
.loan-request-table {
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 20%;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
  color: #0a0909;
}
button {
  color: white;
  background-color: #ff4d4d;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
button:hover {
  background-color: #ff1a1a;
}
</style>
