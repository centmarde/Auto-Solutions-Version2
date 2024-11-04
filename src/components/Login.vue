<template>
  <v-container id="yyts" class="d-flex justify-center align-center fill-height">
    <v-row>
      <!-- Animator consuming 8 columns on large screens -->
      <v-col cols="12" lg="8" md="6" sm="12">
       <v-img class="supra" src="./../assets/images/supra_logo.png" ></v-img>
       <p class="text" >45th anniversary edition</p>
        <Animator class="animator-bg" />
      </v-col>

      <!-- Login form consuming 4 columns on large screens -->
      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card elevation="10" class="p-4 logCard" max-width="400">
          <v-card-title class="text-center">Auto Solutions</v-card-title>
          <v-card-subtitle class="text-center">Login</v-card-subtitle>
          <v-card-text>
            <v-form @submit.prevent="login">
              <!-- Email Input -->
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email-outline"
                outlined
                required
                :rules="[requiredValidator, emailValidator]"
              ></v-text-field>

              <!-- Password Input -->
              <v-text-field
                v-model="password"
                :type="isPasswordVisible ? 'text' : 'password'"
                label="Password"
                prepend-inner-icon="mdi-lock"
                outlined
                required
                class="mb-4"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :rules="[requiredValidator]"
              ></v-text-field>

              <!-- Submit Button -->
              <v-btn
                :loading="isSubmitting"
                block
                color="red-darken-1"
                type="submit"
                :disabled="isSubmitting"
                id="login_button"
              >
                <template v-if="isSubmitting">
                  <v-progress-circular
                    indeterminate
                    color="white"
                    size="20"
                    class="me-2"
                  ></v-progress-circular>
                  Loading...
                </template>
                <template v-else>
                  Login
                  <v-icon right>mdi-arrow-right</v-icon>
                </template>
              </v-btn>

              <!-- Create Account & Go Back -->
              <div class="create-account mt-3 text-center">
                <p>Create Account <router-link to="/register">Sign-up</router-link></p>
                <router-link to="/">Go-Back</router-link>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supaBase"; // importing Supabase client
import axios from "axios";
import { requiredValidator, emailValidator } from '../utils/validator.js';
import Animator from "./Landing3d/Animator.vue";


// udfw jvvl ikom emdl SMTP password

const email = ref("");
const password = ref("");
const isPasswordVisible = ref(false);
const isSubmitting = ref(false);
const router = useRouter();

const login = async () => {
  isSubmitting.value = true;

  try {
    // Supabase Auth using new `signInWithPassword`
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.session) {
      const { session, user } = data;

      // Storing tokens in localStorage
      localStorage.setItem("access_token", session.access_token);
      localStorage.setItem("refresh_token", session.refresh_token);
      localStorage.setItem("auth_id", user.id);

      // Fetching user profile from 'User' table
      const { data: profiles, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id);

      if (profileError || profiles.length === 0) {
        throw new Error("Profile fetch error.");
      }

      localStorage.setItem("user_id", profiles[0].id);
      localStorage.setItem("Role", profiles[0].is_admin ? "true" : "false");

      router.push("/Home");
    } else {
      // Axios fallback for custom login API (Optional)
      const response = await axios.post("http://localhost:3001/login", {
        email: email.value,
        password: password.value,
      });

      if (response.data && response.data.success) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("axios_id", response.data.user_id);

        alert("Login Successfully");
        router.push("/Home");
      } else {
        throw new Error("Invalid login credentials.");
      }
    }
  } catch (error) {
    console.error("Login failed", error);
    alert(error.message || "Error: Unable to login.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>


<style scoped>
/* Animator as background */
.animator-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index:1;
}

/* Responsive adjustments for the login card */
.logCard {
  background-color: rgba(var(--v-theme-background), 0.5); /* Adjusts with light/dark mode */
  backdrop-filter: blur(10px); /* Apply blur for frosted glass effect */
  -webkit-backdrop-filter: blur(10px); /* Support for Safari */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  border: 1px solid rgba(var(--v-theme-on-background), 0.3); /* Adjusts border based on theme */
  z-index: 2;
}

.supra {
  position: absolute;
  width: 50rem;
  bottom: 40%;
  right: 40%;
}
.text {
  position: absolute;
  top: 24%;
  right: 75%;
  transform: translate(-50%, -50%);
  color: #EEEEEE;
}

@media (max-width: 600px) {
  .logCard {
    padding: 20px;
  }
  .supra {
    width: 100%; 
    bottom: auto;
    top: 0%; 
    right: 50%; 
    transform: translateX(50%); 
  }
  .text {
    top: 5%; 
    right: 50%; 
    transform: translate(50%, 0);
  }
}
</style>
