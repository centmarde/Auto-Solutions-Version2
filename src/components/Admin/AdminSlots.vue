<template>
    <DashNavbarVue />
    <div class="w-100 d-flex h-100 gap-5 ">
        <Sidebar class="sukod" />
        <slot name="admin"> </slot>
    </div>

</template>

<script setup>

import CarSaleView from '@/components/Admin/CarSaleView.vue';
import Sidebar from '@/components/Admin/Sidebar.vue';
import DashNavbarVue from "@/components/Admin/DashNavbar.vue";
</script>

<style>
.sukod{
    min-width: 300px;
}
</style>