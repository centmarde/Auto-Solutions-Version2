<template>
    <div 
    class="p-5 height width rounded-3 mt"
     :style="{ backgroundColor: isDark ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: isDark ? '#fff' : '#333' }"
    >
    <h1 class="fw-bold">{{title}}</h1>
    <h5>{{num}}</h5>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'; 

defineProps({
    title: {
        type: String,
        default: 'No title'
    },
    num: {
        type: Number, 
        default: 123,
        validator: value => Number.isInteger(value) 
    }
});
</script>
<style>
.mt{
margin-top: 100px;
}
.height{
    height: 150px;
}
.width{
    width: 450px;
}
</style>