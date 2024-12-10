<template>
  <AdminSlots>
    <template #admin>
      <Exceeded class="index" />
      <Home />
    </template>
  </AdminSlots>
</template>

<script setup>
import AdminSlots from "@/components/Admin/AdminSlots.vue";
import Exceeded from "@/components/Exceeded.vue";
</script>

<style>
.index {
  z-index: 9999;
}
</style>
