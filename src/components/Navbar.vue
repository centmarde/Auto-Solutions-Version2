<template>
  <header
    class="navbar navbar-expand-lg fixed-top"
    :class="{ 'navbar-dark': isDark, 'navbar-light': !isDark }"
    :style="{
      backgroundColor: isDark
        ? 'rgba(52, 52, 52, 0.8)'
        : 'rgba(200, 200, 200, 0.8)',
      color: isDark ? '#fff' : '#333',
    }"
  >
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img
          src="@/assets/images/logo.jpeg"
          alt="logo"
          class="logopic"
          height="50"
        />
        <h3 id="gidor" class="ms-2 mb-0">AUTO-SOLUTIONS</h3>
      </a>

      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        :class="{ show: isMenuVisible }"
        id="navbarNav"
      >
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a href="#CarSale" class="nav-link btn">CARS FOR SALE</a>
          </li>
          <li class="nav-item">
            <a href="#sellcar23" class="nav-link btn">SELL YOUR CAR</a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn"
              ><router-link
                to="/login"
                style="text-decoration: none; color: rgb(97, 40, 255)"
                >RENT A CAR</router-link
              ></a
            >
          </li>
        </ul>

        <ul class="navbar-nav ms-auto d-flex align-items-center">
          <li class="nav-item d-flex">
            <router-link to="/login" class="nav-link btn" @click="closeMenu"
              >LOGIN</router-link
            >
            <i class="fa fa-user-circle ms-1 mt-2" aria-hidden="true"></i>
          </li>
          <li class="nav-item d-flex align-items-center">
            <!-- Theme Toggle -->
            <div class="form-check form-switch">
              <v-switch
                v-model="isChecked"
                @change="toggleTheme"
                hide-details
                inset
              >
                <template v-slot:label>
                  <v-icon>{{
                    isChecked ? "mdi-brightness-5" : "mdi-brightness-3"
                  }}</v-icon>
                </template>
              </v-switch>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTheme } from "vuetify";

const isMenuVisible = ref(false);
const isChecked = ref(false);
const theme = useTheme();
const isDark = ref(theme.global.current.value.dark);

const closeMenu = () => {
  isMenuVisible.value = false;
};

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const toggleTheme = () => {
  const newTheme = isDark.value ? "light" : "dark";
  theme.global.name.value = newTheme;
  isDark.value = newTheme === "dark";
  localStorage.setItem("theme", newTheme); // Save theme in local storage
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  theme.global.name.value = savedTheme;
  isDark.value = savedTheme === "dark";
});
</script>

<style scoped>
.logopic {
  border-radius: 30px;
  max-width: 100px; /* Ensures logo doesn't grow too large */
}

#gidor {
  font-size: 1.2rem;
  font-family: "Merriweather", serif;
}

@media (max-width: 992px) {
  /* Large tablets and small desktops */
  #gidor {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  /* Tablets */
  .logopic {
    height: 40px; /* Smaller logo for smaller screens */
  }

  #gidor {
    font-size: 1rem; /* Smaller title for smaller screens */
  }
}

@media (max-width: 280px) {
  /* Mobile devices */
  .logopic {
    height: 30px; /* Even smaller logo for mobile */
  }

  #gidor {
    font-size: 0.6rem; /* Adjust title size for mobile */
  }
}

/* From Uiverse.io by biswacpcode */
.btn {
  text-decoration: none;
  font-size: 10px;
  border: none;
  background: none;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
}

.btn::before {
  margin-left: auto;
}

.btn::after,
.btn::before {
  content: "";
  width: 0%;
  height: 2px;
  background: rgb(97, 40, 255);
  display: block;
  transition: 0.5s;
}

.btn:hover::after,
.btn:hover::before {
  width: 100%;
}

.drp_btn {
  margin-top: 2px;
}
</style>
