<template>
    <AdminSlots> 
        <template #admin>
            <div class="w-100 side">
            <CarRented />    
        </div>
        </template>
        
    </AdminSlots> 
  
</template>

<script setup>
import AdminSlots from '@/components/Admin/AdminSlots.vue';
import CarRented from '@/components/Admin/CarRented.vue';
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