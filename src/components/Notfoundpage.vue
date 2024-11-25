<template>
  <div class="notfoundanimation">
    <h1 class="text-h3">404 - Page Not Found</h1>
    <div class="floatY">
      <div class="floatX">
        <div class="slideIn">
          <div class="fadeIn">
            <img :src="svg" width="100px" />
          </div>
        </div>
      </div>
    </div>
    <button @click="goHome" class="btn-go-home">Go to Home</button>
  </div>
</template>

<script setup>
import svg from "./NavigationBar/amongus.svg";

const router = useRouter();

const goHome = () => {
  router.push("/home");
};
</script>

<style scoped>
.notfoundanimation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("./NavigationBar/stars.png");
  background-size: cover;
  background-position: center;
  text-align: center;
}

h1 {
  font-weight: 700;
  margin-bottom: 50px; /* Add space between the heading and SVG */
}

.floatY {
  animation: floatY 10s infinite;
}

.floatX {
  animation: floatX 5s infinite;
}

.slideIn {
  animation: slideIn 2s;
}

.fadeIn {
  animation: fadeIn 2s;
}

.spin {
  animation: spin 3s infinite linear;
}

@keyframes floatY {
  0% {
    transform: translateY(20px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(20px);
  }
}

@keyframes floatX {
  0% {
    transform: translateX(10px);
  }
  50% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(10px);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
.btn-go-home {
  margin-top: 50px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-go-home:hover {
  background-color: #45a049;
}
</style>
