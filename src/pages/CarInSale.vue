<template>
    <DashNavbarVue />
    <div class="w-100 d-flex h-100 gap-5 ">
        <Sidebar class="sukod" />
        <CarSaleView />
    </div>
    



</template>

<script setup>

import CarSaleView from '@/components/CarSaleView.vue';
import Sidebar from '@/layouts/Sidebar.vue';
import DashNavbarVue from "../layouts/DashNavbar.vue";
</script>

<style>
.sukod{
    min-width: 300px;
}
</style>