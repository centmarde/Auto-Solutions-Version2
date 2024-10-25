<template>
  <div class="tab-content">
    <img class="content-img" src="../../assets/supra_imgs/distinctive.jpg" alt="content1">
  </div>

  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="10" md="12" sm="12">
        <div class="ms-5">
          <h5>Distinctive Exterior Styling</h5>

          <p>
            Vibrant Mikan Blast paint and a nostalgic, heritage-inspired manually adjustable rear spoiler make the GR Supra 45th Anniversary Edition instantly recognizable. With black exterior side graphics, along with black brake calipers with a GR logo, this edition maintains GR Supra’s legendary pole position in modern style.
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
          <img class="extra-img" src="../../assets/supra_imgs/matte.jpg" alt="content2">
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">19-In. Matte-Black Forged-Aluminum Wheels</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">Announce your arrival, anywhere. Cloaked in a daring matte-black finish, the GR Supra 45th Anniversary Edition’s 19-in. wheels are wrapped in high-performance Michelin® Pilot® Super Sport summer tires to help you get a grip on twists and turns.</p>
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
          <img class="extra-img" src="../../assets/supra_imgs/sport-tuned.jpg" alt="content3">
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">Sport-Tuned Handling</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">The GR Supra 45th Anniversary Edition’s subtle black brake calipers hint at its stopping power, while orange strut tower braces put its handling capabilities vividly on display. Supported by an Adaptive Variable Suspension that’s brilliantly engineered to optimize handling under changing road conditions and adapt to various driving styles, the 45th Anniversary Edition’s performance lives up to its looks.</p>
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
        <div class="car-info mt-5">
          <img class="extra-img" src="../../assets/supra_imgs/premium.jpg" alt="content2">
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">Premium Interior</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">The details inside the 45th Anniversary Edition elevate the experience once you open the door. Leather-trimmed sport seats and a white-stitched cargo mat add a hint of refinement to every drive.</p>
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
        <div class="car-info mt-5">
          <img class="extra-img" src="../../assets/supra_imgs/exclusivity.jpg" alt="content3">
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">Exclusivity</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">Limited to only 900 units in the US market in Mikan Blast or Absolute Zero with an automatic or manual transmission, the 45th Anniversary Edition won't be available for long. These limited editions will also come with a placard commemorating the 45th Anniversary Edition and unique details all around to celebrate the historic milestone and culture that surrounds it.</p>
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

    <div class="table-content mt-4 position-relative">
  <!-- Background image of the car -->
  <img class="content-img" src="../../assets/supra_imgs/exterior.jpg" alt="content1">

  <!-- Overlay container for text and link -->
  <div class="overlay-content">
    <p class="next-up-text">Next Up</p>
    <h1 class="main-title">Exterior</h1>
    <router-link to="/ExteriorPage" class="explore-feature">
      Explore Next Feature
    </router-link>
  </div>
</div>


  </v-container>
</template>

<script>
export default {
  name: "AnniversaryPage",
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
