<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="shadow-md p-4">
          <v-form @submit.prevent="submitForm" ref="form_register">
            <!-- Personal Details -->
            <h5 class="text-start mt-2 mb-3">SIGN-UP</h5>
            <v-row class="mb-3">
              <!-- First Name Field -->
              <v-col cols="12" md="6" class="mb-2">
                <v-text-field
                  v-model="first_name"
                  label="First Name"
                  :rules="[(v) => !!v || 'First Name is required']"
                />
              </v-col>
              <!-- Middle Name Field -->
              <v-col cols="12" md="6" class="mb-2">
                <v-text-field
                  v-model="middle_name"
                  label="Middle Name"
                  :rules="[(v) => !!v || 'Middle Name is required']"
                />
              </v-col>
              <!-- Last Name Field -->
              <v-col cols="12" md="6" class="mb-2">
                <v-text-field
                  v-model="last_name"
                  label="Last Name"
                  :rules="[(v) => !!v || 'Last Name is required']"
                />
              </v-col>
              <!-- Mobile Number Field -->
              <v-col cols="12" md="6" class="mb-2">
                <v-text-field
                  v-model="mobile_no"
                  label="Mobile Number"
                  :rules="[(v) => !!v || 'Mobile Number is required']"
                />
              </v-col>
              <!-- Gender Field -->
              <v-col cols="12" md="12" class="mb-2">
                <v-select
                  v-model="gender"
                  :items="['Male', 'Female', 'Other']"
                  label="Gender"
                  :rules="[(v) => !!v || 'Gender is required']"
                />
              </v-col>
              <!-- Username Field -->
              <v-col cols="12" md="12" class="mb-2">
                <v-text-field
                  v-model="user_name"
                  label="User Name"
                  :rules="[(v) => !!v || 'User Name is required']"
                />
              </v-col>
            </v-row>

            <!-- Password -->
            <v-row class="mb-3">
              <v-col cols="12" md="12" class="mb-2">
                <v-text-field
                  v-model="email"
                  label="Email"
                  :rules="[(v) => !!v || 'Email is required']"
                  type="email"
                />
              </v-col>
              <v-col cols="12" md="6" class="mb-2">
                <v-text-field
                  v-model="password"
                  label="Password"
                  :rules="[(v) => !!v || 'Password is required']"
                  type="password"
                />
              </v-col>
              <v-col cols="12" md="6" class="mb-2">
                <v-text-field
                  v-model="passwordConfirm"
                  label="Password Confirmation"
                  :rules="[(v) => v === password || 'Passwords must match']"
                  type="password"
                />
              </v-col>
            </v-row>

            <hr />

            <!-- Address -->
            <h4 class="text-start mt-2 mb-3">Address</h4>
            <v-row class="mb-3">
              <!-- Region Dropdown -->
              <v-col cols="12" md="3" class="mb-2">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    id="regionDropdownButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ selectedRegionName || "Region" }}
                  </button>
                  <ul
                    class="dropdown-menu w-100"
                    aria-labelledby="regionDropdownButton"
                    id="regionDropdown"
                    style="max-height: 200px; overflow-y: auto"
                  >
                    <li v-for="region in regions" :key="region.code">
                      <a class="dropdown-item" @click="selectRegion(region)">{{
                        region.name
                      }}</a>
                    </li>
                  </ul>
                  <input type="hidden" v-model="selectedRegionCode" required />
                </div>
              </v-col>
              <!-- Province Dropdown -->
              <v-col cols="12" md="3" class="mb-2">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    id="provinceDropdownButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ selectedProvinceName || "Province" }}
                  </button>
                  <ul
                    class="dropdown-menu w-100"
                    aria-labelledby="provinceDropdownButton"
                    id="provinceDropdown"
                    style="max-height: 200px; overflow-y: auto"
                  >
                    <li v-for="province in provinces" :key="province.code">
                      <a
                        class="dropdown-item"
                        @click="selectProvince(province)"
                        >{{ province.name }}</a
                      >
                    </li>
                  </ul>
                  <input
                    type="hidden"
                    v-model="selectedProvinceCode"
                    required
                  />
                </div>
              </v-col>
              <!-- City Dropdown -->
              <v-col cols="12" md="3" class="mb-2">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    id="cityDropdownButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ selectedCityName || "City" }}
                  </button>
                  <ul
                    class="dropdown-menu w-100"
                    aria-labelledby="cityDropdownButton"
                    id="cityDropdown"
                    style="max-height: 200px; overflow-y: auto"
                  >
                    <li v-for="city in cities" :key="city.code">
                      <a class="dropdown-item" @click="selectCity(city)">{{
                        city.name
                      }}</a>
                    </li>
                  </ul>
                  <input type="hidden" v-model="selectedCityCode" required />
                </div>
              </v-col>
              <!-- Barangay Dropdown -->
              <v-col cols="12" md="3" class="mb-2">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    id="barangayDropdownButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ selectedBarangayName || "Barangay" }}
                  </button>
                  <ul
                    class="dropdown-menu w-100"
                    aria-labelledby="barangayDropdownButton"
                    id="barangayDropdown"
                    style="max-height: 200px; overflow-y: auto"
                  >
                    <li v-for="barangay in barangays" :key="barangay.code">
                      <a
                        class="dropdown-item"
                        @click="selectBarangay(barangay)"
                        >{{ barangay.name }}</a
                      >
                    </li>
                  </ul>
                  <input
                    type="hidden"
                    v-model="selectedBarangayCode"
                    required
                  />
                </div>
              </v-col>
            </v-row>

            <!-- Submit and Login Buttons -->
            <v-row class="mb-3">
              <v-col cols="12" class="d-flex justify-content-center">
                <v-btn
                  type="submit"
                  class="me-3"
                  :loading="isSubmitting"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">
                    <v-progress-circular
                      indeterminate
                      size="20"
                      class="me-2"
                    ></v-progress-circular>
                    Loading...
                  </span>
                  <span v-else>Submit</span>
                </v-btn>
                <router-link to="/login" class="text-decoration-none">
                  <v-btn type="button" class="mx-3"> Login </v-btn>
                </router-link>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { supabase } from "../lib/supaBase"; // Adjust the import based on your project structure
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from "../utils/validator.js";

export default {
  data() {
    return {
      user_name: "",
      email: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      mobile_no: "",
      gender: "",
      password: "",
      passwordConfirm: "",
      regions: [],
      selectedRegionCode: "",
      selectedRegionName: "",
      provinces: [],
      selectedProvinceCode: "",
      selectedProvinceName: "",
      cities: [],
      selectedCityCode: "",
      selectedCityName: "",
      barangays: [],
      selectedBarangayCode: "",
      selectedBarangayName: "",
      isSubmitting: false,
    };
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true;
      const { error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          data: {
            username: this.user_name,
            first_name: this.first_name,
            middle_name: this.middle_name,
            last_name: this.last_name,
            mobile_no: this.mobile_no,
            gender: this.gender,
            region: this.selectedRegionName,
            province: this.selectedProvinceName,
            city: this.selectedCityName,
            barangay: this.selectedBarangayName,
          },
        },
      });
      if (error) {
        this.$toast.error(error.message);
        this.isSubmitting = false;
      } else {
        this.$toast.success("You have successfully registered.");
        this.$router.push("/login");
      }
    },
    async fetchRegion() {
      const response = await axios.get("https://psgc.gitlab.io/api/regions/");
      this.regions = response.data;
    },
    async fetchProvinces(regionCode) {
      const response = await axios.get(
        `https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`
      );
      this.provinces = response.data;
    },
    async fetchCities(provinceCode) {
      const response = await axios.get(
        `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`
      );
      this.cities = response.data;
    },
    async fetchBarangays(cityCode) {
      const response = await axios.get(
        `https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays/`
      );
      this.barangays = response.data;
    },
    selectRegion(region) {
      this.selectedRegionCode = region.code;
      this.selectedRegionName = region.name;
      this.selectedProvinceCode = "";
      this.selectedProvinceName = "";
      this.selectedCityCode = "";
      this.selectedCityName = "";
      this.selectedBarangayCode = "";
      this.selectedBarangayName = "";
      this.provinces = [];
      this.cities = [];
      this.barangays = [];
      this.fetchProvinces(region.code);
    },
    selectProvince(province) {
      this.selectedProvinceCode = province.code;
      this.selectedProvinceName = province.name;
      this.selectedCityCode = "";
      this.selectedCityName = "";
      this.selectedBarangayCode = "";
      this.selectedBarangayName = "";
      this.cities = [];
      this.barangays = [];
      this.fetchCities(province.code);
    },
    selectCity(city) {
      this.selectedCityCode = city.code;
      this.selectedCityName = city.name;
      this.selectedBarangayCode = "";
      this.selectedBarangayName = "";
      this.barangays = [];
      this.fetchBarangays(city.code);
    },
    selectBarangay(barangay) {
      this.selectedBarangayCode = barangay.code;
      this.selectedBarangayName = barangay.name;
    },
  },
  mounted() {
    this.fetchRegion();
  },
};
</script>

<style scoped>
.dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
}
</style>
