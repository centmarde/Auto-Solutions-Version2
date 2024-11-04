<template>
  <v-app>
    <v-main>
      <router-view />
      <Ai v-if="$route.meta.hideAi" />
    </v-main>
  </v-app>
</template>

<script setup>
import Ai from './layouts/Ai.vue';
</script>

<style>
p{
  font-size: 13px;
}
</style>
