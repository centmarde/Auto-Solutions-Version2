<template>
  <v-card elevation="10" id="garage-card" class="pa-10">
    <v-row>
      <v-col cols="12" lg="12" md="12" sm="5">
        <v-card-title>
          <h3 id="title" class="text-center">GARAGE</h3>
        </v-card-title>
      </v-col>

      <v-col cols="12" lg="12" md="12" sm="5">
        <v-img
          class="d-block mx-auto"
          src="https://www.cars.com/images/garage-landing/garage-hero.webp"
          alt="Garage Image"
          width="8.5rem"
          style="left: 15%"
        ></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center my-2">
        <router-link to="/Garage" style="text-decoration: none;">
          <v-btn @click="handleSubmit" color="primary" class="btnn32">
            Get Started
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </router-link>
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
        // If logged in, redirect to rent contents page
        this.$router.push("/RentContents");
      } else {
        // If not logged in, redirect to login page
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
#garage-card {
  overflow: hidden;
}

#title {
  font-family: "Merriweather", serif;
}

/* Image styling for responsive design */
@media (max-width: 800px) and (min-width: 350px) {
  .sts4 {
    top: 20%;
    left: 10%;
    margin-bottom: 2rem;
  }
}

/* Button styling for "Get Started" */
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
  color: #ffffff;
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

.btnn32:hover {
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
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
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
