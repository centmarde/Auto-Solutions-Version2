<template>

    <div class="w-100 d-flex h-100 gap-5">
            <div 
            class="w-25 h-100 p-5 "
            :class="{'navbar-dark': isDark, 'navbar-light': !isDark}"
            :style="{ backgroundColor: isDark ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: isDark ? '#fff' : '#333' }"
            >
            <div class=" d-flex align-items-center h-50 ">
                <i class="fa-solid fa-house fa-lg"></i>
                <router-link 
                to="/Dashboard" 
                class="btn wes fw-bold mt-1" 
                :class="{ underline: route.path === '/Dashboard' }"
                >Dashboard</router-link>
            </div>
        </div>
        <div class="d-flex  justify-content-center gap-5 w-100 flex-wrap ">
            <card title="Total Car in Sell"/>
            <card title="Total Car in Rent"/>

        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Card from './Card.vue';


const route = useRoute();
</script>

<style>

.underline {
    text-decoration: underline;
}
</style>
