<template>
  <v-card class="p-4" elevation="10">
    <v-row>
      <v-col cols="12" >
        <h3 id="title" class="text-center">POST CAR</h3>
       
  
        <v-row class="d-flex justify-content-center">
          <span class="text-center">for rent</span>
        </v-row>
      </v-col>

      <v-col cols="12" >
        <v-img
          src="https://cdn-icons-png.flaticon.com/512/8566/8566110.png"
          style="width: 10rem;"
          class="position-relative"
          id="sts4"
          alt="Rent a Car"
        ></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center my-1">
        <v-btn @click="handleSubmit" color="primary" class="btnn32">
          Get Started
          <v-icon right>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isSubmitting: false,
    };
  },
  methods: {
    handleSubmit() {
      // Check if user is logged in
      const isLoggedIn = localStorage.getItem("access_token") !== null;

      if (isLoggedIn) {
        // If logged in, redirect to sell contents page (e.g., Home)
        this.$router.push("/RentContents");
      } else {
        // If not logged in, redirect to Register page
        this.$router.push("/login");
      }
    },
  },



};
</script>

<style scoped>
#xrt23 {
  overflow: hidden;
}

#title {
  font-family: "Merriweather", serif;
}

#sts4 {
  position: relative;
  top: 5%;
  left: 25%;
  margin-bottom: 2rem;
}

@media (max-width: 800px) and (min-width: 350px) {
  #sts4 {
    top: 20%;
    left: 26%;
    margin-bottom: 2rem;
  }
}

.erd3 {
  width: 4.5rem;
}

@media (max-width: 999px) and (min-width: 350px) {
  .erd3 {
    width: 3rem;
    height: 3rem;
  }
}

@media (max-width: 1400px) and (min-width: 999px) {
  .erd3 {
    width: 4rem;
    height: 4rem;
  }
}

.btnn32 {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: rgb(97, 40, 255);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffff;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
  cursor: pointer;
}

.icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;
}

.btnn32hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.btnn32:hover .icon {
  transform: translate(4px);
}

.btnn32:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.btnn32::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%);
  top: 0;
  left: -100px;
  opacity: 0.6;
}

@keyframes shine {
  0% {
    left: -100px;
  }

  60% {
    left: 100%;
  }

  to {
    left: 100%;
  }
}
</style>
