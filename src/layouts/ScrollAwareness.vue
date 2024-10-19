<template>
  <div  v-if="isVisible"
    @click="scrollToBottom"class="scroll-awareness container_mouse">
    <span class="mouse-btn">
        <span class="mouse-scroll"></span>
    </span>
    <span>Scroll Down</span>
</div>
 
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    scrollToBottom() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
  mounted() {
    setInterval(this.toggleVisibility, 3000);
  },
};
</script>

<style scoped>
/* From Uiverse.io by mrhyddenn */ 
.mouse-btn {
  margin: 10px auto;
  width: 40px;
  height: 80px;
  border: 3px solid rgba(122, 122, 124, 0.918);
  border-radius: 20px;
  display: flex;
}

.mouse-scroll {
  display: block;
  width: 20px;
  height: 20px;
  background: linear-gradient(170deg, rgba(122, 122, 124, 0.918), rgb(123, 124, 124));
  border-radius: 50%;
  margin: auto;
  animation: scrolling13 1s linear infinite;
}

@keyframes scrolling13 {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(20px);
  }
}
</style>
