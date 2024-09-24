<template>
    <div 
    class="p-5 height width rounded-3 mt"
     :class="{'navbar-dark': isDark, 'navbar-light': !isDark}"
     :style="{ backgroundColor: isDark ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: isDark ? '#fff' : '#333' }"
    >
    <h1 id="font" class="fw-bold">{{title}}</h1>
    <h5 id="font">{{num}}</h5>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useTheme } from 'vuetify';  

onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    theme.global.name.value = savedTheme;
    isDark.value = savedTheme === 'dark';
  });

    const theme = useTheme();
  const isDark = ref(theme.global.current.value.dark); 
  
  const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    isDark.value = newTheme === 'dark';
    localStorage.setItem('theme', newTheme); 
  };
  


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
#font {
  font-size: 2rem;
  font-family: "Merriweather", serif; 
}
</style>