<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-card class="mt-2 shadow-lg">
          <v-row>
            <v-col class="p-3" cols="12" lg="12">
              <div class="video-container">
                <video
                  ref="supraVideo"
                  src="../assets/videos/Supra.mp4"
                  class="video-fit"
                  loop
                  autoplay
                  muted
                ></video>
              </div>
            </v-col>
            <v-col cols="12" lg="12">
              <v-img
                src="https://seeklogo.com/images/T/toyota-logo-3A02221675-seeklogo.com.png"
                alt="Toyota"
                class="img-fluid toyota_logo"
              />

              <container class="positions text-start title_S">
                <div>
                  <b>2024 GR Supra</b>
                  <p>Starting MSRP $ 46,440*</p>
                </div>

                <p class="title_span">
                  45th Anniversary Edition shown in Mikan Blast. Prototype
                  shown. Professional driver on closed course. <br />
                  Do not attempt.
                </p>
              </container>
              <v-card-actions>
                <v-row
                  justify="center"
                  align="center"
                  class="d-flex justify-content-center"
                >
                  <v-col cols="12" md="4" class="d-flex justify-center">
                    <router-link to="/Supra" class="tr" exact>
                      <v-btn color="border" class="border">
                        View in 3D
                        <v-icon right>mdi-arrow-right</v-icon>
                      </v-btn>
                    </router-link>
                  </v-col>
                  <v-col cols="12" md="4" class="d-flex justify-center">
                    <router-link to="/MainComponent" class="tr" exact>
                      <v-btn color="border" class="border">
                        More info
                        <v-icon right>mdi-arrow-right</v-icon>
                      </v-btn>
                    </router-link>
                  </v-col>
                  <v-col cols="12" md="4" class="d-flex justify-center">
                    <a
                      href="https://www.toyota.com/southeasttoyota/deals-incentives/financial-estimates-supra/?vehicles=supra"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="tr"
                    >
                      <v-btn color="border" class="border">
                        Interested
                        <v-icon right>mdi-arrow-right</v-icon>
                      </v-btn>
                    </a>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onMounted, ref } from "vue";
import MainComponent from "@/components/NavigationBar/MainComponent.vue";

export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.tr {
  text-decoration: none;
}
</style>

<style>
#ppo {
  font-family: "Merriweather", serif;
}

.lofi {
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

.tr {
  text-decoration: none;
  color: inherit; /* Ensures it takes the same color as the parent */
}

.lofihover {
  transform: scale(1.05);
  border-color: #fff9;
}

.lofi:hover .icon {
  transform: translate(4px);
}

.lofi:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.lofi::before {
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
.video-container {
  position: relative;
  padding-bottom: 30.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  background-color: black;
}

.video-fit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.positions {
  position: absolute;
  left: 2rem;
  bottom: 7rem;
}
.title_S {
  font-size: 30px;
}
.title_span {
  font-size: 10px;
}
.toyota_logo {
  position: absolute;
  right: 1.5rem;
  bottom: 6rem;
  width: 6%;
  z-index: 888;
}
@media (max-width: 960px) {
  .title_S {
    font-size: 10px; /* Further reduced font size for very small screens */
  }
  .positions {
    position: relative;
    top: 10px;
  }
  .title_span {
    font-size: 5px; /* Further reduced font size for very small screens */
  }

  .toyota_logo {
    position: absolute;
    top: 200px;
    width: 10%; /* Increased size for better visibility */
  }
  .video-container {
    position: relative;
    padding-bottom: 80.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    background-color: black;
  }
}
@media (max-width: 960px) {
  .title_S {
    font-size: 20px;
  }
  .title_span {
    font-size: 10px;
  }
}
</style>
