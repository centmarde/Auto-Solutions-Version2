<template>
    <AdminSlots> 
        <template #admin>
            <DashNavbar class="index" />
            <Home />    
        </template>
        
    </AdminSlots> 
  

</template>

<script setup>
import DashNavbar from '@/components/Admin/DashNavbar.vue';
import AdminSlots from '@/components/Admin/AdminSlots.vue';
import Home from '../Home.vue';
</script>

<style>
.sukod{
    min-width: 300px;
}
.index{
    z-index: 9999;
}
</style>