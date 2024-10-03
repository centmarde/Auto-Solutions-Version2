<template>
    <AdminSlots> 
        <template #admin>
            <Home />    
        </template>
        
    </AdminSlots> 
  

</template>

<script setup>
import AdminSlots from '@/components/Admin/AdminSlots.vue';
import Home from '../Home.vue';
</script>

<style>
.sukod{
    min-width: 300px;
}
</style>