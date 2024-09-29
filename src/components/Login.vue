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
              prepend-icon="mdi-account"
              outlined
              required
              class="mb-4"
            ></v-text-field>
  
            <!-- Password Input -->
            <v-text-field
              v-model="password"
              :type="passwordType"
              label="Password"
              prepend-icon="mdi-lock"
              outlined
              required
              class="mb-4"
              append-icon="mdi-eye"
              @click:append="togglePassword"
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
  import { supabase } from "../lib/supaBase";
  import axios from "axios";
  
  const email = ref("");
  const password = ref("");
  const passwordType = ref("password");
  const isSubmitting = ref(false); // State to track loading
  const router = useRouter();
  
  const togglePassword = () => {
    passwordType.value = passwordType.value === "password" ? "text" : "password";
  };
  
  const login = async () => {
    isSubmitting.value = true; // Set loading state
  
    try {
      // Attempt Supabase sign-in first
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });
  
      if (data.session) {
        const { session, user } = data;
        
        // Store tokens and user ID from Supabase
        localStorage.setItem("access_token", session.access_token);
        localStorage.setItem("refresh_token", session.refresh_token);
        localStorage.setItem("auth_id", user?.id);
  
        // Fetch user profiles
        let { data: profiles } = await supabase
          .from("User")
          .select("*")
          .eq("auth_id", localStorage.getItem("auth_id"));
  
        if (profiles && profiles.length > 0) {
          localStorage.setItem("user_id", profiles[0].id);
          localStorage.setItem("Role", profiles[0].isadmin ? "true" : "false");
  
         
          router.push("/Home");
        } else {
          throw new Error("Profile fetch error.");
        }
      } else {
        // If Supabase login fails, attempt Axios login
        const response = await axios.post("http://localhost:3001/login", {
          email: email.value,
          password: password.value,
        });
  
        if (response.data && response.data.success) {
          // Store tokens and user ID from backend response
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("axios_id", response.data.user_id);
  
          // Redirect to home page after successful login
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
      // Re-enable the login button
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
  