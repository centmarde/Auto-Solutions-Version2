<template>
  <AdminSlots>
    <template #admin>
      <div class="w-100 side">
        <LoanedCars />
      </div>
    </template>
  </AdminSlots>
</template>

<script setup>
import AdminSlots from "@/components/Admin/AdminSlots.vue";
import LoaningCars from "@/pages/adminPages/LoaningCars.vue";
import Sidebar from "@/components/Admin/Sidebar.vue";
import DashNavbarVue from "../../components/Admin/DashNavbar.vue";
import LoanedCars from "./LoanedCars.vue";
</script>

<style>
.sukod {
  min-width: 300px;
}
.side {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
</style>
