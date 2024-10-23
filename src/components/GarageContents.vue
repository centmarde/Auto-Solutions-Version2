<template>
  <v-container class="my-5">
    <v-card class="p-5">
      <v-card-title class="text-center">
        <h1>Insert A Car into your Garage</h1>
      </v-card-title>
      <v-form @submit.prevent="submitCarDetails">
        <v-row>
          <!-- Car Image Input -->
          <v-col cols="12" md="6" class="mb-3">
            <v-file-input
              label="Car Image"
              @change="onImageChange"
              required
              show-size
              prepend-inner-icon="mdi-image"
            ></v-file-input>
            <v-img
              v-if="imagePreview"
              :src="imagePreview"
              class="mt-3"
              width="5rem"
              alt="Car Image Preview"
            />
          </v-col>

          <!-- Car Brand with Suggestions -->
          <v-col cols="12" md="6" class="mb-3 position-relative">
            <v-text-field
              label="Car Brand"
              v-model="car.brand"
              @input="filterBrands"
              placeholder="Enter car brand"
              required
            ></v-text-field>
            <v-list v-if="suggestedBrands.length" class="position-absolute w-100" style="z-index: 1000; max-height: 200px; overflow-y: auto;">
              <v-list-item-group>
                <v-list-item
                  v-for="(brand, index) in suggestedBrands"
                  :key="index"
                  @click="selectBrand(brand)"
                >
                  <v-list-item-content>{{ brand }}</v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>

          <!-- Car Model with Suggestions -->
          <v-col cols="12" md="12" class="mb-3 position-relative">
            <v-text-field
              label="Car Model"
              v-model="car.model"
              @input="filterModels"
              placeholder="Enter car model"
              required
            ></v-text-field>
            <v-list v-if="suggestedModels.length" class="position-absolute w-100" style="z-index: 1000; max-height: 200px; overflow-y: auto;">
              <v-list-item-group>
                <v-list-item
                  v-for="(model, index) in suggestedModels"
                  :key="index"
                  @click="selectModel(model)"
                >
                  <v-list-item-content>{{ model }}</v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>

        

          <!-- Description -->
          <v-col cols="12" class="mb-3">
            <v-textarea
              label="Description"
              v-model="car.description"
              rows="4"
              placeholder="Describe your car"
            ></v-textarea>
          </v-col>

          <v-col cols="12" class="text-center mb-4">
              <h5>Additional Contents (Optional)</h5>
            </v-col>

          <!-- Year of Manufacture -->
          <v-col cols="12" md="6" class="mb-3">
            <v-text-field
              label="Year of Manufacture"
              v-model="car.year"
              placeholder="Enter year (e.g. 2021)"
            ></v-text-field>
          </v-col>

          <!-- Car Specifications -->
          <v-col cols="12" md="6" class="mb-3">
            <v-text-field
              label="Engine"
              v-model="car.engine"
              placeholder="Enter engine specifications"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="mb-3">
            <v-text-field
              label="Horsepower"
              v-model="car.horse_power"
              placeholder="Enter horsepower"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="mb-3">
            <v-text-field
              label="Torque"
              v-model="car.torque"
              placeholder="Enter torque"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="mb-3">
            <v-text-field
              label="Top Speed"
              v-model="car.top_speed"
              placeholder="Enter top speed"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="mb-3">
            <v-text-field
              label="Transmission"
              v-model="car.transmission"
              placeholder="Enter transmission type"
            ></v-text-field>
          </v-col>

          <!-- Mileage -->
          <v-col cols="12" md="12" class="mb-3">
            <v-text-field
              label="Mileage (in KM)"
              v-model="car.mileage"
              placeholder="Enter mileage"
            ></v-text-field>
          </v-col>

          

          <v-container>
            <v-row>
              <v-col cols="12" md="4" class="text-center">
                <v-btn 
    @click="generateAISuggestions" 
    :loading="loading2" 
    class="attention-btn" 
    ref="attentionBtn"
    style="width: 30rem; position: relative; overflow: hidden; transition: all 0.3s ease-in-out;"
  >
    <template v-if="loading2">
      <v-progress-circular 
        indeterminate 
        color="white" 
        size="20" 
        class="mr-2"
      ></v-progress-circular>
      Loading...
    </template>
    <template v-else>
      Generate AI Suggestions
    </template>
    <v-icon right ref="lightbulbIcon">mdi-lightbulb</v-icon>
  </v-btn>
              </v-col>

              <v-col cols="12" md="4" class="text-center">
                <v-btn @click="submitCarDetails" :loading="loading" class="lofi" style="width: 30rem;">
                  <template v-if="loading">
                    <v-progress-circular indeterminate color="white" size="20" class="mr-2"></v-progress-circular>
                    Loading...
                  </template>
                  <template v-else>
                    Submit
                  </template>
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="12" md="4" class="text-center">
                <router-link to="/Home" class="tr" exact>
                  <v-btn class="lofi" style="width: 30rem;">
                    Exit
                    <v-icon right>mdi-arrow-left</v-icon>
                  </v-btn>
                </router-link>
              </v-col>
            </v-row>
          </v-container>

        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import { supabase } from '../lib/supaBase';
import { getChatCompletion } from '../seed/generate-car-details';

export default {
    data() {
        return {
            car: {
                brand: '',
                model: '',
                year: null,
                mileage: null,
             
                description: '',
                engine: '',
                horse_power: '',
                torque: '',
                top_speed: '',
                transmission: '',
              
            },
            
            carData: [],
            makesData: [],
            suggestedBrands: [],
            suggestedModels: [],
            imagePreview: null,
            selectedImage: null,
            loading: false,
            loading2: false,
        };
    },
    
    methods: {
      async generateAISuggestions() {
    // Check if required fields are filled
    const requiredFields = [];
    if (!this.car.brand) requiredFields.push('Brand');
    if (!this.car.model) requiredFields.push('Model');
   
   

    if (requiredFields.length > 0) {
        alert(`Please fill in the following required fields: ${requiredFields.join(', ')}`);
        return; // Stop further execution if required fields are missing
    }

    // Identify the optional fields that need AI suggestions
    const fieldsToFill = [];
    if (!this.car.mileage) fieldsToFill.push('Mileage');
    if (!this.car.engine) fieldsToFill.push('Engine');
    if (!this.car.description) fieldsToFill.push('Description');
    if (!this.car.horse_power) fieldsToFill.push('Horsepower');
    if (!this.car.torque) fieldsToFill.push('Torque');
    if (!this.car.top_speed) fieldsToFill.push('TopSpeed');
    if (!this.car.year) fieldsToFill.push('YearModel');
    if (!this.car.transmission) fieldsToFill.push('Transmission');

    // If there are fields that need AI suggestions, call the AI API
    if (fieldsToFill.length > 0) {
        try {
            this.loading2 = true;
            const aiResponse = await getChatCompletion(this.car.brand, this.car.model, fieldsToFill);
            const lines = aiResponse.split('\n').map(line => line.trim()).filter(line => line);

            // Parse AI response into car data
            lines.forEach(line => {
                const [key, value] = line.split(':').map(part => part.trim());
                switch (key) {
                    case 'Mileage':
                        this.car.mileage = value;
                        break;
                    case 'Engine':
                        this.car.engine = value;
                        break;
                    case 'Description':
                        this.car.description = value;
                        break;
                    case 'Horsepower':
                        this.car.horse_power = value;
                        break;
                    case 'Torque':
                        this.car.torque = value;
                        break;
                    case 'TopSpeed':
                        this.car.top_speed = value;
                        break;
                    case 'YearModel':
                        this.car.year = value;
                        break;
                    case 'Transmission':
                        this.car.transmission = value;
                        break;
                }
            });
            alert("AI suggestions generated successfully!");
        } catch (error) {
            console.log("Error generating AI suggestions:", error);
           console.log("Failed to generate AI suggestions.");
        } finally {
            this.loading2 = false;
        }
    } else {
        alert("No additional suggestions needed. All fields are filled.");
    }
},


        async submitCarDetails() {
            if (!this.car.model || !this.car.brand) {
                alert('Please fill in all required fields!');
                return;
            }

            this.loading = true;
            const userId = localStorage.getItem('user_id');

            const carDetails = {
                brand: this.car.brand,
                model: this.car.model,
                year: this.car.year,
                mileage: this.car.mileage,
              
                description: this.car.description,
                engine: this.car.engine,
                horse_power: this.car.horse_power,
                torque: this.car.torque,
                top_speed: this.car.top_speed,
                transmission: this.car.transmission,
              
                for_sale: false,
                for_rent: false,
                is_garage: true,
                user_id: userId,
            };

            try {
                const { data: insertData, error: insertError } = await supabase
                    .from('cars')
                    .insert([carDetails])
                    .select();

                if (insertError) throw insertError;

                console.log('Car Details Submitted:', insertData);

                if (this.selectedImage) {
                    const imageUrl = await this.imageUpload();

                    await supabase
                        .from('cars')
                        .update({ img: imageUrl })
                        .match({ id: insertData[0].id });
                }

                alert('Car details submitted successfully!');
            } catch (error) {
                console.error('Error submitting car details:', error);
                alert('Failed to submit car details.');
            } finally {
                this.loading = false;
            }
        },

        async imageUpload() {
            if (!this.selectedImage) {
                console.log('No image selected for upload.');
                return;
            }

            const fileName = `public/${Date.now()}_${this.selectedImage.name}`;
            try {
                const { data, error } = await supabase
                    .storage
                    .from('cars')
                    .upload(fileName, this.selectedImage, {
                        cacheControl: "3600",
                        upsert: true,
                    });

                if (error) throw error;

                const imageUrl = `https://xgjgtijbrkcwwsliqubk.supabase.co/storage/v1/object/public/cars/${fileName}`;
                console.log('Image uploaded successfully:', imageUrl);

                return imageUrl;
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Failed to upload image.');
            }
        },

        async fetchCarData() {
            try {
                const response1 = await axios.get("https://raw.githubusercontent.com/centmarde/carsMockdata/main/allcars.json");
                this.carData = response1.data;

                const response2 = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
                this.makesData = response2.data.Results.map(item => item.MakeName);
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        },

        async fetchModelsForMake(make) {
            try {
                const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`);
                this.suggestedModels = response.data.Results.map(model => model.Model_Name);
            } catch (error) {
                console.error(`Error fetching models for make ${make}:`, error);
            }
        },

        filterBrands() {
            const inputBrand = this.car.brand.toLowerCase();
            this.suggestedBrands = this.makesData
                .filter(brand => brand.toLowerCase().includes(inputBrand));
        },

        async selectBrand(brand) {
            this.car.brand = brand;
            this.suggestedBrands = [];
            await this.fetchModelsForMake(brand);
        },

        filterModels() {
            const inputModel = this.car.model.toLowerCase();
            this.suggestedModels = this.suggestedModels
                .filter(model => model.toLowerCase().includes(inputModel));
        },

        selectModel(model) {
            this.car.model = model;
            this.suggestedModels = [];
        },
       

        onImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedImage = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    },

    mounted() {
        this.fetchCarData();
     

    }
};
</script>


<style scoped>
.attention-btn {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: rgb(0, 151, 106);
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
.attention-btn:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.attention-btn:hover .icon {
  transform: translate(4px);
}

.attention-btn:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.attention-btn::before {
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
}</style>