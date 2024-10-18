<template>
  <v-container>
    <v-card class="p-5" elevation="8">
      <v-card-body>
        <v-row>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="car1.brand"
              label="Car Brand 1 e.g Ferrari"
              @blur="fetchModels('car1')"
              outlined
            />
            <v-autocomplete
              v-model="car1.model"
              :items="suggestedModels.car1"
              label="Model 1"
              outlined
              hide-no-data
              hide-details
            />
          </v-col>
          <v-col cols="12" md="2">
            <h1 class="text-center mt-5">VS</h1>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="car2.brand"
              label="Car Brand 2 e.g Lamborghini"
              @blur="fetchModels('car2')"
              outlined
            />
            <v-autocomplete
              v-model="car2.model"
              :items="suggestedModels.car2"
              label="Model 2"
              outlined
              hide-no-data
              hide-details
            />
          </v-col>
          
        </v-row>
        
        <div class="d-flex justify-center mt-3">
              <v-btn @click="compareCars" color="primary">Compare</v-btn>
        </div>
        <v-row v-if="comparisonResults.length">
          <v-col cols="12">
            <canvas id="comparisonChart" width="400" height="200"></canvas>
          </v-col>
          <v-col cols="12" class="mt-5">
            <h3 class="text-center">Summary</h3>
            <p class="text-center">{{ overallComment }}</p>
          </v-col>
         
        </v-row>
        
      </v-card-body>
      
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { getResponse } from '../seed/CompareCar';
import Chart from 'chart.js/auto';
import axios from 'axios';

const car1 = ref({ brand: '', model: '' });
const car2 = ref({ brand: '', model: '' });
const suggestedModels = ref({ car1: [], car2: [] });
const comparisonResults = ref([]);
const overallComment = ref('');
const overallWinner = ref('');

async function fetchModels(car) {
  const make = car === 'car1' ? car1.value.brand : car2.value.brand;
  if (make) {
    try {
      const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`);
      suggestedModels.value[car] = response.data.Results.map(model => model.Model_Name);
    } catch (error) {
      console.error("Error fetching car models:", error);
      suggestedModels.value[car] = [];
    }
  } else {
    suggestedModels.value[car] = [];
  }
}

async function compareCars() {
  const userMessage = `Compare ${car1.value.brand} ${car1.value.model} and ${car2.value.brand} ${car2.value.model}. Please provide a score from 0 to 100 for Topspeed, Torque, Technology, Design, Comfort, and include Price, FuelEfficiency, SafetyFeatures, ResaleValue, and an overall comment.`;

  try {
    const response = await getResponse(userMessage);
    const results = response.split(';');

    if (results.length < 3) {
      throw new Error("Response format is incorrect.");
    }

    const [car1Data, car2Data] = results.slice(0, 2).map(car => parseCarDetails(car));
    overallComment.value = results[2] || 'No overall comment provided.';

    comparisonResults.value = [
      {
        brand: car1.value.brand,
        Topspeed: car1Data.Topspeed || 0,
        Torque: car1Data.Torque || 0,
        Technology: car1Data.Technology || 0,
        Comfort: car1Data.Comfort || 0,
        Design: car1Data.Design,
        FuelEfficiency: car1Data.FuelEfficiency || 0,
        ResaleValue: car1Data.ResaleValue || 0,
      },
      {
        brand: car2.value.brand,
        Topspeed: car2Data.Topspeed || 0,
        Torque: car2Data.Torque || 0,
        Technology: car2Data.Technology || 0,
        Comfort: car2Data.Comfort || 0,
        Design: car2Data.Design,
        FuelEfficiency: car2Data.FuelEfficiency || 0,
        ResaleValue: car2Data.ResaleValue || 0,
      },
    ];

    await updateChart();
  } catch (error) {
    console.error("Error comparing cars:", error);
  }
}

function parseCarDetails(details) {
  if (!details || !details.includes(':')) {
    console.error("Invalid car details format:", details);
    return { Topspeed: 0, Torque: 0, Technology: 0, Comfort: 0, Design: 0 };
  }

  const metrics = details.split(', ').reduce((acc, metric) => {
    const [key, value] = metric.split(': ');
    if (key && value) {
      acc[key.trim()] = isNaN(value.trim()) ? value.trim() : parseInt(value.trim(), 10) || 0;
    } else {
      console.warn("Unexpected metric format:", metric);
    }
    return acc;
  }, {});

  return {
    Topspeed: metrics.Topspeed || 0,
    Torque: metrics.Torque || 0,
    Technology: metrics.Technology || 0,
    Comfort: metrics.Comfort || 0,
    Design: metrics.Design,
    FuelEfficiency: metrics.FuelEfficiency || 0,
    ResaleValue: metrics.ResaleValue || 0,
  };
}

async function updateChart() {
  await nextTick();
  const ctx = document.getElementById('comparisonChart')?.getContext('2d');

  if (!ctx) {
    console.error("Canvas element not found.");
    return;
  }

  if (window.comparisonChart instanceof Chart) {
    window.comparisonChart.destroy();
  }

  window.comparisonChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [car1.value.brand, car2.value.brand],
      datasets: [
        {
          label: 'TopSpeed',
          data: [comparisonResults.value[0].Topspeed, comparisonResults.value[1].Topspeed],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Torque',
          data: [comparisonResults.value[0].Torque, comparisonResults.value[1].Torque],
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
        {
          label: 'Technology',
          data: [comparisonResults.value[0].Technology, comparisonResults.value[1].Technology],
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
        },
        {
          label: 'Comfort',
          data: [comparisonResults.value[0].Comfort, comparisonResults.value[1].Comfort],
          backgroundColor: 'rgba(255, 255, 0, 0.5)',
        },
        {
          label: 'Fuel Efficiency',
          data: [comparisonResults.value[0].FuelEfficiency, comparisonResults.value[1].FuelEfficiency],
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
        },
        {
          label: 'Resale Value',
          data: [comparisonResults.value[0].ResaleValue, comparisonResults.value[1].ResaleValue],
          backgroundColor: 'rgba(255, 165, 0, 0.5)',
        },
        {
          label: 'Design',
          data: [comparisonResults.value[0].Design, comparisonResults.value[1].Design],
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
