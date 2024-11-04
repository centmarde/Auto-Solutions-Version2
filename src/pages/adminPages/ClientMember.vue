<template>
    <AdminSlots> 
        <template #admin>
            <Clients class="index" />
            <Home />    
        </template>
        
    </AdminSlots> 
  

</template>

<script setup>
import AdminSlots from '@/components/Admin/AdminSlots.vue';
import Clients from '@/components/Admin/users/Clients.vue';
</script>

<style>

.index{
    z-index: 9999;
}
</style>