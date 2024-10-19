<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="shadow-md p-4">
          <v-form @submit.prevent="submitForm" ref="form_register">
            <!-- Personal Details -->
            <h5 class="text-start mt-2 mb-3">SIGN-UP</h5>
            <v-row class="mb-3">
              <!-- Username Field -->
              <v-col cols="12" md="6" class="mb-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="User Name"
                  v-model="user_name"
                  required
                />
              </v-col>
            </v-row>

            <!-- Password -->
            <v-row class="mb-3">
              <v-col cols="12" md="4" class="mb-2">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="email"
                  required
                />
              </v-col>
              <v-col cols="12" md="4" class="mb-2">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                  rules="[requiredValidator, passwordValidator]"
                  required
                />
              </v-col>
              <v-col cols="12" md="4" class="mb-2">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password Confirmation"
                  v-model="passwordConfirm"
                  required
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
                    {{ selectedRegionName || 'Region' }}
                  </button>
                  <ul
                    class="dropdown-menu w-100"
                    aria-labelledby="regionDropdownButton"
                    id="regionDropdown"
                    style="max-height: 200px; overflow-y: auto"
                  >
                    <li v-for="region in regions" :key="region.code">
                      <a
                        class="dropdown-item"
                        @click="selectRegion(region)"
                        >{{ region.name }}</a
                      >
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
                    {{ selectedProvinceName || 'Province' }}
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
                    {{ selectedCityName || 'City' }}
                  </button>
                  <ul
                    class="dropdown-menu w-100"
                    aria-labelledby="cityDropdownButton"
                    id="cityDropdown"
                    style="max-height: 200px; overflow-y: auto"
                  >
                    <li v-for="city in cities" :key="city.code">
                      <a class="dropdown-item" @click="selectCity(city)"
                        >{{ city.name }}</a
                      >
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
                    {{ selectedBarangayName || 'Barangay' }}
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
                <button type="submit" id="submitBtn" class="sski mx-3" :disabled="isSubmitting">
                  <span v-if="isSubmitting">
                    <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                    <span>Loading...</span>
                  </span>
                  <span v-else>Submit</span>
                  <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button type="button" id="loginBtn" class="sski mx-3">
                  <router-link to="/login" class="text-decoration-none">Login</router-link>
                </button>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { supabase } from '../lib/supaBase'; // Adjust the import based on your project structure
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator
} from '../utils/validator.js';

export default {
  data() {
    return {
      user_name: '',
      email: '',
   
      password: '',
      passwordConfirm: '',
      regions: [],
      selectedRegionCode: '',
      selectedRegionName: '',
      provinces: [],
      selectedProvinceCode: '',
      selectedProvinceName: '',
      cities: [],
      selectedCityCode: '',
      selectedCityName: '',
      barangays: [],
      selectedBarangayCode: '',
      selectedBarangayName: '',
      isSubmitting: false,
    };
  },
  methods: {
    async fetchRegions() {
      try {
        const response = await axios.get('https://psgc.gitlab.io/api/regions/');
        this.regions = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchProvinces(regionCode) {
      try {
        const response = await axios.get('https://psgc.gitlab.io/api/provinces/');
        this.provinces = response.data.filter(province => province.regionCode === regionCode);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCities(provinceCode) {
      try {
        const response = await axios.get('https://psgc.gitlab.io/api/cities/');
        this.cities = response.data.filter(city => city.provinceCode === provinceCode);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchBarangays(cityCode) {
      try {
        const response = await axios.get('https://psgc.gitlab.io/api/barangays/');
        this.barangays = response.data.filter(barangay => barangay.cityCode === cityCode);
      } catch (error) {
        console.error(error);
      }
    },
    selectRegion(region) {
      this.selectedRegionCode = region.code;
      this.selectedRegionName = region.name;
      this.fetchProvinces(this.selectedRegionCode);
    },
    selectProvince(province) {
      this.selectedProvinceCode = province.code;
      this.selectedProvinceName = province.name;
      this.fetchCities(this.selectedProvinceCode);
    },
    selectCity(city) {
      this.selectedCityCode = city.code;
      this.selectedCityName = city.name;
      this.fetchBarangays(this.selectedCityCode);
    },
    selectBarangay(barangay) {
      this.selectedBarangayCode = barangay.code;
      this.selectedBarangayName = barangay.name;
    },
    async submitForm() {
      if (!this.email || !this.password || !this.user_name || !this.passwordConfirm || !this.selectedRegionCode || !this.selectedProvinceCode || !this.selectedCityCode || !this.selectedBarangayCode) {
        alert('Please fill out all required fields.');
        return;
      }

      if (this.password !== this.passwordConfirm) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      this.isSubmitting = true;

      try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        });

        if (signUpError) {
          console.error('Error signing up:', signUpError.message);
          alert('An error occurred during sign-up. Please try again.');
          return;
        }

        const user_id = signUpData?.user?.id;

        if (user_id) {
          const address = `${this.selectedBarangayName}, ${this.selectedCityName}, ${this.selectedProvinceName}, ${this.selectedRegionName}`;
          const additionalUserData = {
            user_name: this.user_name,
            user_id: user_id,
            address: address,
            isadmin: false
          };

          try {
            const { data, error } = await supabase
              .from('users')
              .insert([additionalUserData])
              .select();

            if (error) {
              console.error('Error inserting additional data:', error.message);
              alert(`Error: ${error.message}`);
            } else {
              const supa_id = data[0]?.id;
              await this.fetchUserData(supa_id, this.user_name, address);
              alert('Register Successfully');
              window.location.href = '/login';
              console.log(data);
            }
          } catch (error) {
            console.error('Unexpected error:', error.message);
            alert(`Error: ${error.message}`);
          } finally {
            this.$refs.form_register.reset();
            this.isSubmitting = false;
          }
        } else {
          console.error('User ID is null');
          alert('Error: User ID is null');
        }
      } catch (error) {
        console.error('Error submitting form:', error.message);
        alert('An unexpected error occurred. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
    async fetchUserData(supa_id, user_name, address) {
      try {
        const response = await axios.post('http://localhost:3001/User', {supa_id, user_name, address});
        console.log('User data fetched:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    },
  },
  mounted() {
    this.fetchRegions();
  },
};
</script>

<style scoped>
.container-fluid {
  background: var(--background-light);
  height: 100vh;
}

.wrap-form {
  background: var(--card-bg-light);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.input-box .form-control,
.input-box .form-select {
  border-radius: 8px;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-link {
  color: var(--primary-color);
}

.spinner-border {
  border-color: var(--primary-color);
}

@media (max-width: 767.98px) {
  .wrap-form {
    padding: 2rem;
  }
}
</style>

