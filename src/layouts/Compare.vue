<template>
  <v-container>
    <v-card class="p-5" elevation="8">
      <v-card-body>
        <v-row>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="car1.brand"
              label="Car Brand 1 e.g Toyota"
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
              label="Car Brand 2 e.g Nissan"
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

        <!-- Chart Section -->
        <v-row v-if="comparisonResults.length">
          <v-col cols="12">
            <canvas id="comparisonChart" width="400" height="200"></canvas>
          </v-col>

          <!-- Metrics and Raw Values -->
          <v-col cols="12" v-for="(metric, index) in metricsList" :key="index">
            <v-card outlined class="pa-3 mb-3">
              <h4>{{ metric }}</h4>
              <p>
                <strong>{{ comparisonResults[0].brand }}:</strong>
                {{ comparisonResults[0].metrics[metric] }} <br />
                <strong>{{ comparisonResults[1].brand }}:</strong>
                {{ comparisonResults[1].metrics[metric] }}
              </p>
            </v-card>
          </v-col>

          <!-- Overall Comment -->
          <v-col cols="12" class="mt-5">
            <h3 class="text-center">Summary</h3>
            <p class="text-center">{{ overallComment }}</p>
          </v-col>
        </v-row>
      </v-card-body>

      <!-- Compare Button -->
      <div class="d-flex justify-center mt-3">
        <v-btn @click="compareCars" color="primary">Compare</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { getResponse } from "../seed/CompareCar"; // Your helper function
import Chart from "chart.js/auto";
import axios from "axios";

const car1 = ref({ brand: "", model: "" });
const car2 = ref({ brand: "", model: "" });
const suggestedModels = ref({ car1: [], car2: [] });
const comparisonResults = ref([]);
const overallComment = ref("");
const metricsList = [
  "Topspeed",
  "Torque",
  "Technology",
  "Comfort",
  "FuelEfficiency",
  "ResaleValue",
  "Design",
];

// Fetch car models from external API
async function fetchModels(car) {
  const make = car === "car1" ? car1.value.brand : car2.value.brand;
  if (make) {
    try {
      const response = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
      );
      suggestedModels.value[car] = response.data.Results.map(
        (model) => model.Model_Name
      );
    } catch (error) {
      console.error("Error fetching car models:", error);
      suggestedModels.value[car] = [];
    }
  } else {
    suggestedModels.value[car] = [];
  }
}

// Compare cars and get raw values
async function compareCars() {
  const userMessage = `Compare ${car1.value.brand} ${car1.value.model} and ${car2.value.brand} ${car2.value.model}. Please provide raw values for Topspeed, Torque, Technology, Comfort, FuelEfficiency, ResaleValue, Design, and include an overall comment.`;

  try {
    const response = await getResponse(userMessage);
    const results = response.split(";");

    const car1Data = parseCarDetails(results[0]);
    const car2Data = parseCarDetails(results[1]);
    overallComment.value = results[2].replace("OverallComment: ", "").trim();

    comparisonResults.value = [
      {
        brand: car1.value.brand,
        metrics: car1Data.metrics,
      },
      {
        brand: car2.value.brand,
        metrics: car2Data.metrics,
      },
    ];

    await updateChart();
  } catch (error) {
    console.error("Error comparing cars:", error);
  }
}

// Parse raw values
function parseCarDetails(details) {
  const metrics = {};
  details.split(", ").forEach((line) => {
    const [key, value] = line.split(": ");
    if (key && value) {
      metrics[key.trim()] = value.trim(); // Store raw values as strings
    }
  });
  return { metrics };
}

// Extract numeric values for chart rendering
function extractNumeric(value) {
  return parseFloat(value.replace(/[^\d.]/g, "")) || 0; // Remove units like "km/h"
}

// Update Chart.js
async function updateChart() {
  await nextTick();
  const ctx = document.getElementById("comparisonChart")?.getContext("2d");

  if (!ctx) return;

  if (window.comparisonChart instanceof Chart) {
    window.comparisonChart.destroy();
  }

  window.comparisonChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        comparisonResults.value[0].brand,
        comparisonResults.value[1].brand,
      ],
      datasets: metricsList.map((metric, index) => ({
        label: metric,
        data: [
          extractNumeric(comparisonResults.value[0].metrics[metric]),
          extractNumeric(comparisonResults.value[1].metrics[metric]),
        ],
        backgroundColor: `rgba(${index * 30}, ${index * 40}, 200, 0.5)`,
      })),
    },
    options: {
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
