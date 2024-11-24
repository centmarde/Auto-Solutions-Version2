<template>
  <v-card class="paddings fixed-height" elevation="10">
    <v-row>
      <v-col cols="12">
        <h3 id="title" class="text-center">{{ title }}</h3>
        <v-row class="d-flex justify-content-center">
          <span class="text-center">{{ subtitle }}</span>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-img
          :src="image"
          :alt="altText"
          :style="{ width: imgWidth }"
          class="position-relative"
          id="sts4"
        ></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center my-1">
        <v-btn @click="handleSubmit" color="primary" class="btnn32">
          {{ buttonText }}
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      required: true,
    },
    imgWidth: {
      type: String,
      default: "8rem",
    },
    buttonText: {
      type: String,
      default: "Get Started",
    },
    redirectTo: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleSubmit() {
      const isLoggedIn = localStorage.getItem("access_token") !== null;
      if (isLoggedIn) {
        this.$router.push(this.redirectTo);
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.paddings {
  padding: 25px;
}
.fixed-height {
  height: 300px;
}

#title {
  font-family: "Merriweather", serif;
}

#sts4 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-bottom: 2rem;
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
