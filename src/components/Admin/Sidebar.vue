<template>
  <div
    class="view h-100 p-5 display position-relative"
    :style="{
      backgroundColor: isDark ? '#2A2A2A' : '#E9ECEF',
      color: isDark ? '#FFFFFF' : '#333333',
    }"
  >
    <div
      class="d-flex justify-content-center align-content-center flex-column h-50 position-fixed"
    >
      <!-- First Link (Dashboard) -->
      <div class="mt-10 position-relative bot">
        <v-icon>mdi-view-dashboard</v-icon>
        <router-link
          to="/Admin"
          class="btn wes fw-bold mt-1"
          :class="{
            'text-white': isDark,
            'text-dark': !isDark,
            underline: isActiveRoute('/Admin').value,
          }"
        >
          <p class="mt-4 fw-bold fst">Dashboard</p>
          <v-divider></v-divider>
        </router-link>
      </div>

      <!-- Second Link (View As Client) -->
      <div class="position-relative bot">
        <i class="fa-solid fa-user fa-lg"></i>
        <router-link
          to="/Home"
          class="btn wes fw-bold mt-1"
          :class="{
            'text-white': isDark,
            'text-dark': !isDark,
            underline: isActiveRoute('/Home').value,
          }"
        >
          <p class="mt-4 fw-bold fst">View Client Side</p>
          <v-divider></v-divider>
        </router-link>
      </div>

      <div class="position-relative bot">
        <v-icon>mdi mdi-car-clock</v-icon>
        <router-link
          to="/AdminReview"
          class="btn wes fw-bold mt-1"
          :class="{
            'text-white': isDark,
            'text-dark': !isDark,
            underline: isActiveRoute('/AdminReview').value,
          }"
        >
          <p class="mt-4 fw-bold fst">Cars to Review</p>
          <v-divider></v-divider>
        </router-link>
      </div>

      <div class="position-relative bot">
        <v-icon>mdi mdi-car-back</v-icon>
        <router-link
          to="/LoanReview"
          class="btn wes fw-bold mt-1"
          :class="{
            'text-white': isDark,
            'text-dark': !isDark,
            underline: isActiveRoute('/LoanReview').value,
          }"
        >
          <p class="mt-4 fw-bold fst">Loan Car Review</p>
          <v-divider></v-divider>
        </router-link>
      </div>

      <!-- Third Link (Admin members) -->
      <div class="position-relative bot">
        <i class="fa-solid fa-toolbox fa-lg"></i>
        <router-link
          to="/AdminMembers"
          class="btn wes fw-bold mt-1"
          :class="{
            'text-white': isDark,
            'text-dark': !isDark,
            underline: isActiveRoute('/AdminMembers').value,
          }"
        >
          <p class="mt-4 fw-bold fst">Admin Members</p>
          <v-divider></v-divider>
        </router-link>
      </div>

      <!-- Fourth Link (Client members) -->
      <div class="position-relative bot">
        <i class="fa-regular fa-money-bill-1 fa-lg"></i>
        <router-link
          to="/Clients"
          class="btn wes fw-bold mt-1"
          :class="{
            'text-white': isDark,
            'text-dark': !isDark,
            underline: isActiveRoute('/Clients').value,
          }"
        >
          <p class="mt-4 fw-bold fst">Client Members</p>
        </router-link>
      </div>

      <!-- Footer Link (Logout) -->
      <div class="fixed-bottom fixed-start side">
        <v-icon>mdi-logout</v-icon>
        <router-link
          to="/"
          class="btn wes fw-bold mt-1"
          :class="{
            'text-white': isDark,
            'text-dark': !isDark,
            underline: isActiveRoute('/').value,
          }"
          @click="handleLogout"
        >
          <p class="fw-bold fst mt-3">Logout</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTheme } from "vuetify";
import { useRoute, useRouter } from "vue-router";
import { supabase, doLogout as supabaseLogout } from "../../lib/supaBase";

const theme = useTheme();
const isDark = ref(theme.global.current.value.dark);

// Fetch the current route
const route = useRoute();
const router = useRouter();

// Theme toggle function
const toggleTheme = () => {
  const newTheme = isDark.value ? "light" : "dark";
  theme.global.name.value = newTheme;
  isDark.value = newTheme === "dark";
  localStorage.setItem("theme", newTheme);
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  theme.global.name.value = savedTheme;
  isDark.value = savedTheme === "dark";
});

// Computed function to check active route
const isActiveRoute = (path) => computed(() => route.path === path);

// Logout handler
const handleLogout = async () => {
  try {
    await supabaseLogout();
    localStorage.removeItem("user_id");
    localStorage.removeItem("axios_id");
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>

<style scoped>
.display {
  overflow-x: hidden;
}
.underline {
  text-decoration: underline;
}
.fst {
  font-size: 18px;
}
.side {
  margin-left: 30px;
}
.view {
  width: 300px;
}
.bot {
  left: -15px;
}
.text-dark {
  color: #333333 !important;
}

@media (max-width: 992px) {
  .display {
    display: none;
  }
}
</style>
