<template>
  <v-container id="yyts" class="d-flex justify-center align-center fill-height">
    <v-card class="p-4" width="400">
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
            color="primary"
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
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../lib/supaBase"; // importing Supabase client
import axios from "axios";
import { requiredValidator, emailValidator } from '../utils/validator.js';

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
        .eq("auth_id", user.id);

      if (profileError || profiles.length === 0) {
        throw new Error("Profile fetch error.");
      }

      localStorage.setItem("user_id", profiles[0].id);
      localStorage.setItem("Role", profiles[0].isadmin ? "true" : "false");

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
.create-account {
  margin-top: 1.5rem;
  font-size: 0.875rem;
}

.password-toggle-button {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
}
</style>
