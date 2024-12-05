<template>
  <v-card class="mx-4 mb-5" style="padding: 2rem">
    <v-row>
      <v-col cols="12" sm="12" lg="8" md="8">
        <v-card-text>
          <h3 id="ttrs">YOUR GARAGE</h3>
          <v-divider class="my-5"></v-divider>
          <h2>Add your car. Track its value.</h2>
          <p>
            Add your car to Your Garage to track its market value and cash in
            when the time is right to sell.
          </p>

          <v-row>
            <v-col class="d-flex justify-content-start mt-4">
              <!-- Submit Button -->
              <v-btn
                class="sski"
                :disabled="isSubmitting"
                @click="navigateToLogin"
              >
                <template v-if="isSubmitting">
                  <v-progress-circular
                    indeterminate
                    color="white"
                    size="20"
                    class="me-2"
                  ></v-progress-circular>
                  <span>Loading...</span>
                </template>
                <template v-else>
                  <router-link to="/login" class="nav-link"
                    >Get-Started</router-link
                  >
                </template>
                <v-icon>mdi-arrow-right-circle</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="mt-5 apol align-center">
            <v-col class="d-flex align-center gap-2">
              <span>Already have an account?</span>
              <router-link to="/login" class="nav-link log-in-link"
                ><b>Log-in</b></router-link
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>

      <v-col
        cols="12"
        lg="4"
        md="5"
        sm="12"
        class="d-flex justify-content-center"
      >
        <v-img
          class="ssed"
          src="https://www.cars.com/images/garage-landing/garage-hero.webp"
          alt="ssed"
          width="100%"
        ></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
const navigateToLogin = () => {
  console.log("Navigating to login...");
};
</script>

<style>
#ttrs {
  font-family: "Merriweather", serif;
}

/* Button styling */
.sski {
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
  color: #fff !important;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
  cursor: pointer;
}

.sski .nav-link {
  color: #fff !important;
  text-decoration: none;
}

.icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;
}

.sski:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.sski:hover .icon {
  transform: translate(4px);
}

.sski:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.sski::before {
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

.apol {
  display: flex;
  justify-content: flex-start;
}

.log-in-link {
  color: rgb(97, 40, 255);
  font-weight: bold;
  text-decoration: none;
}

.ssed {
  width: 20rem;
}

@media (max-width: 360px) {
  .apol {
    font-size: 0.9rem;
  }
  .ssed {
    width: 15rem;
  }
}
</style>
