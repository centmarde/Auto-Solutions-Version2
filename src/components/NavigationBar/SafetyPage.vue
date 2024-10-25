<template>
    <div class="tab-content">
      <img
        class="content-img"
        src="../../assets/supra_imgs/smart.jpg"
        alt="content1"
      />
    </div>
  
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="10" md="12" sm="12">
          <div class="ms-5">
            <h5>Smart Safety</h5>
  
            <p>
                GR Supra comes equipped with a number of intelligent safety features, including a Pre-Collision System * with Pedestrian Detection, * Lane Departure Warning with Steering Assist,* Automatic High Beams * and Speed Limit Information. *
            </p>
          </div>
          <v-tab
            class="view-specs-tab"
            :class="{ active: isActive }"
            @click="toggleUnderline"
          >
            View specs
          </v-tab>
        </v-col>
      </v-row>
  
      <!-- New section with 3 columns -->
      <v-row>
        <!-- First image in the first column -->
        <v-col cols="6">
          <div class="car-info">
            <img
              class="extra-img"
              src="../../assets/supra_imgs/available.jpg"
              alt="content2"
            />
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">Available Front and Rear Parking Sensors</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">
                Tech that helps detect what you might not. When you’re parking, sensors on the front and rear of GR Supra scan for walls, curbs and other objects that might be hidden from your view. * Should the system anticipate a collision, it will emit an audible alert, reduce engine output, and automatically apply the brakes. Simulation shown.
            </p>
          </div>
          <v-tab
            class="view-specs-tab"
            :class="{ active: isActive }"
            @click="toggleUnderline"
          >
            View specs
          </v-tab>
        </v-col>
  
        <!-- Second image in the last column -->
        <v-col cols="6">
          <div class="car-info">
            <img
              class="extra-img"
              src="../../assets/supra_imgs/no.jpg"
              alt="content3"
            />
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">No Cost Maintenance Plan and Roadside Assistance</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">
                Every new Toyota comes with ToyotaCare, * a maintenance plan that covers normal factory scheduled service for 2 years or 25,000 miles, whichever comes first, and 24-hour Roadside Assistance for 2 years, unlimited mileage.
            </p>
          </div>
          <v-tab
            class="view-specs-tab"
            :class="{ active: isActive }"
            @click="toggleUnderline"
          >
            View specs
          </v-tab>
        </v-col>
      </v-row>
  
      <!-- New picture below the last content -->
      <div class="table-content mt-4">
        <img
          class="content-img"
          src="../../assets/supra_imgs/driver.jpg"
          alt="content1"
        />
        <!-- Car title -->
        <h5 class="car-title mt-2 ms-5">
            Available Driver Assist Package
        </h5>
        <!-- Car description -->
        <p class="car-description mt-3 ms-5">
            GR Supra’s available Driver Assist and Safety and Technology Packages’ suites of active safety technologies bring added peace of mind to every drive. The Blind Spot Monitor (BSM) * system is designed to help alert you to vehicles that may be hiding in your blind spot, letting you know when it’s safe to change lanes. When you’re slowly backing out of a driveway or parking spot, Rear Cross-Traffic Alert (RCTA) * provides audible and visual indicators to help warn you of approaching vehicles. And Cruise Control * on Manual Transmission models helps keep your GR Supra going at your desired speed, while Full-Speed Range Dynamic Radar Cruise Control (DRCC) * on Automatic Transmission models helps with highway driving by keeping GR Supra at a preset distance from the vehicle ahead of it, automatically accelerating and braking as needed.
        </p>
        <v-tab
          class="view-specs-tab"
          :class="{ active: isActive }"
          @click="toggleUnderline"
        >
          View specs
        </v-tab>
      </div>
  
      <div class="table-content mt-4 position-relative">
        <!-- Background image of the car -->
        <img
          class="content-img"
          src="../../assets/supra_imgs/perf.jpg"
          alt="content1"
        />
  
        <!-- Overlay container for text and link -->
        <div class="overlay-content">
          <p class="next-up-text">Next Up</p>
          <h1 class="main-title">Performace</h1>
          <router-link to="/PerformancePage" class="explore-feature">
            Explore Next Feature
          </router-link>
        </div>
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "SafetyPage",
    data() {
      return {
        isActive: false, // Tracks whether "View specs" is clicked
      };
    },
    methods: {
      toggleUnderline() {
        this.isActive = !this.isActive;
      },
    },
  };
  </script>
  
  <style scoped>
  .tab-content {
    display: flex;
    flex-direction: column; /* Added to stack title and description vertically */
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    font-size: 24px;
  }
  
  .content-img {
    width: 100%;
    height: auto; /* Adjusted to ensure image maintains aspect ratio */
  }
  
  .view-specs-tab {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
    margin-top: 10px; /* Added margin for spacing */
  }
  
  .extra-img {
    width: 100%;
    height: auto;
  }
  
  .car-title {
    font-weight: bold;
    margin-top: 10px;
  }
  
  .car-description {
    color: #666;
    font-size: 14px;
  }
  .position-relative {
    position: relative; /* Allow positioning of child elements */
  }
  
  .explore-feature {
    display: inline-block;
    padding: 10px 20px;
    background-color: white;
    color: black;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  }
  .overlay-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
  }
  .next-up-text {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .main-title {
    font-size: 48px;
    font-weight: bold;
    margin: 10px 0;
  }
  </style>
  