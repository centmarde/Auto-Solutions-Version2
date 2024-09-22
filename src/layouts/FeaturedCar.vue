<template>
  <v-container>
    <h2 id="ppo" class="text-center">Featured Cars</h2>
    <v-row>
      <v-col cols="12" lg="4" md="12" sm="12">
        <v-card class="mt-2 shadow-lg">
          <v-img src="../assets/images/Supra.png" class="card-img-top" alt="2024 Toyota GR Supra"></v-img>
          <v-card-title>2024 Toyota GR Supra</v-card-title>
          <v-card-text>
            <p>The Toyota GR Supra is a high-performance sports car known for its striking design and powerful engine. With exhilarating acceleration and precision handling, the Supra offers an exceptional driving experience.</p>
          </v-card-text>
          <v-card-actions>
            <router-link to="/Supra" class="tr" exact>
              <v-btn color="primary">
                Explore More
                <v-icon right>
                  mdi-arrow-right
                </v-icon>
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="12" sm="12">
        <v-card class="mt-2 shadow-lg">
          <v-img src="../assets/images/Honda_Civic.png" class="card-img-top" alt="2024 Honda Civic"></v-img>
          <v-card-title>2024 Honda Civic</v-card-title>
          <v-card-text>
            <p>The Honda Civic is a reliable and fuel-efficient compact sedan, offering a perfect blend of style, performance, and practicality. Known for its modern design and advanced technology, the Civic is a top choice for daily commuters.</p>
          </v-card-text>
          <v-card-actions>
            <router-link to="/Honda" class="tr" exact>
              <v-btn color="primary">
                Explore More
                <v-icon right>
                  mdi-arrow-right
                </v-icon>
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="12" sm="12">
        <v-card class="mt-2 shadow-lg">
          <v-img src="../assets/images/NissanZ.png" class="card-img-top" alt="2024 Nissan Z Performance"></v-img>
          <v-card-title>2024 Nissan Z Performance</v-card-title>
          <v-card-text>
            <p>The 2024 Nissan Z Performance is a high-powered sports car with a rich legacy. Combining retro-inspired styling with modern technology, this iconic coupe offers thrilling performance and sharp handling for driving enthusiasts.</p>
          </v-card-text>
          <v-card-actions>
            <router-link to="/Nissan" class="tr" exact>
              <v-btn color="primary">
                Explore More
                <v-icon right>
                  mdi-arrow-right
                </v-icon>
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.tr {
  text-decoration: none;
}
</style>

<style>
#ppo {
  font-family: "Merriweather", serif;
}

.lofi {
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

.tr {
  text-decoration: none;
  color: inherit; /* Ensures it takes the same color as the parent */
}

.lofihover {
  transform: scale(1.05);
  border-color: #fff9;
}

.lofi:hover .icon {
  transform: translate(4px);
}

.lofi:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.lofi::before {
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
</style>
