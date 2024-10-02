<template>
    <AdminSlots> 
        <template #admin>
            <CarRentView />    
        </template>
        
    </AdminSlots> 
  
</template>

<script setup>
import AdminSlots from '@/components/Admin/AdminSlots.vue';
import CarRentView from '@/components/Admin/CarRentView.vue';
import Sidebar from '@/components/Admin/Sidebar.vue';
import DashNavbarVue from "../../components/Admin/DashNavbar.vue";
</script>

<style>
.sukod{
    min-width: 300px;
}
</style>