<template>
    <AdminSlots> 
        <template #admin>
            <div class="w-100 side">
            <CarPurchased />    
        </div>
        </template>
        
    </AdminSlots> 
  
</template>

<script setup>
import AdminSlots from '@/components/Admin/AdminSlots.vue';
import CarPurchased from '@/components/Admin/CarPurchased.vue';
import Sidebar from '@/components/Admin/Sidebar.vue';
import DashNavbarVue from "../../components/Admin/DashNavbar.vue";
</script>

<style>
.sukod{
    min-width: 300px;
}
.side {
    overflow-x: auto; 
    overflow-y: hidden; 
    white-space: nowrap; 
}
</style>