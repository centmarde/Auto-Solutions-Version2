<template>
  <div class="tab-content">
    <img
      class="content-img"
      src="../../assets/supra_imgs/built.jpg"
      alt="content1"
    />
  </div>

  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="10" md="12" sm="12">
        <div class="ms-5">
          <h5>Built for Drivers</h5>

          <p>
            GR Supra’s interior is the ideal blend of form, function and beauty.
            Designed with the driver in mind, this cockpit features a number of
            inspired touches to help you get the most out of every drive. Deeply
            bolstered sport seats match up with console-mounted side knee
            padding to ensure you’re comfortably in place, no matter the
            tightness of the turn.
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
            src="../../assets/supra_imgs/sport.jpg"
            alt="content2"
          />
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">Sport Seats</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">
            GR Supra’s seats are designed for maximum hold, offering deep
            power-adjustable side bolsters and high-grip material to help keep
            you upright when the roads get sideways. Available 14-way power
            adjustment helps you find that perfect driving position. Available
            leather trim and three-stage heating features also ensure that these
            sport seats help keep you feeling comfortable and refreshed on any
            drive.
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
            src="../../assets/supra_imgs/digital.jpg"
            alt="content3"
          />
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">Digital Display</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">
            An 8.8-in. high-resolution display rests in GR Supra’s gauge pod. A
            three-dimensional tachometer sits prominently in the center, showing
            not only engine speed, but also current gear selection and suggested
            driving gear. It’s flanked by displays that can be customized to
            show current speed, navigation and other key driving info.
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
        src="../../assets/supra_imgs/steering.jpg"
        alt="content1"
      />
      <!-- Car title -->
      <h5 class="car-title mt-2 ms-5">
        Sport Steering Wheel
      </h5>
      <!-- Car description -->
      <p class="car-description mt-3 ms-5">
        Taking hold of your dreams starts here. GR Supra features a leather-wrapped, tilt/telescopic steering wheel for quick response and easy controllability. Steering-column-mounted paddle shifters give you even more control over GR Supra’s power.
      </p>
      <v-tab
        class="view-specs-tab"
        :class="{ active: isActive }"
        @click="toggleUnderline"
      >
        View specs
      </v-tab>
    </div>

    <!-- New section with 3 columns -->
    <v-row>
      <!-- First image in the first column -->
      <v-col cols="6">
        <div class="car-info">
          <img
            class="extra-img mt-3"
            src="../../assets/supra_imgs/supra.jpg"
            alt="content2"
          />
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">Supra Command</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">
            The Supra Command * dial gives you access to GR Supra’s key multimedia features. Its available touch-sensitive surface lets you use your fingers to write in addresses for the navigation system * and zoom in and out of the map. Selecting between functions is as simple as a twist and press of the dial. * The dial is flanked by genuine carbon-fiber accents to bring additional sports-car cred to this intuitive piece of tech.
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
            class="extra-img mt-3"
            src="../../assets/supra_imgs/room.jpg"
            alt="content3"
          />
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">Room for More</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">
            GR Supra features an open trunk area that offers over ten cubic feet of storage space—perfect for a weekend bag, your camera gear and your driving suit and helmet. * A rigid chassis brace connects the rear strut towers to further optimize handling. Two of GR Supra’s premium speakers also rest forward of this trunk space, helping fill the cabin with rich, powerful sound.
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

    <div class="table-content mt-4 position-relative">
      <!-- Background image of the car -->
      <img
        class="content-img"
        src="../../assets/supra_imgs/technology.jpg"
        alt="content1"
      />

      <!-- Overlay container for text and link -->
      <div class="overlay-content">
        <p class="next-up-text">Next Up</p>
        <h1 class="main-title">Technology</h1>
        <router-link to="/TechnologyPage" class="explore-feature">
          Explore Next Feature
        </router-link>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "InteriorPage",
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
