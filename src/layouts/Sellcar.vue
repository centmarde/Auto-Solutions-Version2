<template>
  <v-container class="my-5">
    <v-card class="pa-10">
      <v-row>
        <v-col cols="12" lg="6" md="6" sm="12">
          <h3 id="title">SELL YOUR CAR</h3>
          <v-row class="d-flex align-center">
            <v-img
              class="erd3 me-2"
              src="https://www.cars.com/images/sell/explore-ready-go.png"
              alt="Get an Offer"
              max-width="100"
            ></v-img>
            <span>
              Get an offer online and quickly complete the transaction with a
              local dealer.
            </span>
          </v-row>

          <v-divider></v-divider>

          <v-row class="d-flex align-center">
            <v-img
              class="erd3 me-2"
              src="https://www.cars.com/images/sell/explore-enter-details.png"
              alt="List Your Car"
              max-width="100"
            ></v-img>
            <span>
              List your car for free. Set your own price and easily showcase
              your car on Auto-Solutions.
            </span>
          </v-row>
        </v-col>

        <v-col cols="12" lg="6" md="6" sm="12" class="d-flex justify-center">
          <v-img
            src="https://www.cars.com/images/sell/sale-dealer-woman-brand-colors.png"
            style="width: 15rem"
            class="mt-4"
          ></v-img>
        </v-col>
      </v-row>

      <br />
      <br />
      <v-row class="d-flex justify-center my-2">
        <v-btn
          @click="handleSubmit"
          class="btnn32"
          color="primary"
          elevation="2"
        >
          Get Started
          <v-icon right> mdi-arrow-right </v-icon>
        </v-btn>
      </v-row></v-card
    >
  </v-container>
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
        this.$router.push("/SellContents");
      } else {
        // If not logged in, redirect to Register page
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
#xrt23 {
  overflow: hidden;
}

#title {
  font-family: "Merriweather", serif;
}

@media (max-width: 800px) and (min-width: 350px) {
  #sts4 {
    top: 50%;
    left: 0%;
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
