<template>
  <AdminSlots>
    <template #admin>
      <Admins class="index" />
      <Home />
    </template>
  </AdminSlots>
</template>

<script setup>
import AdminSlots from "@/components/Admin/AdminSlots.vue";
import Admins from "C:/Web dev/Auto-sol/Auto-Solutions-Version2/src/components/LoanCar/PendingLoans.vue";
</script>

<style>
.index {
  z-index: 9999;
}
</style>
