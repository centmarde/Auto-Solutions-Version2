<template>
    <v-container>
      <v-card class="p-5">
        <h1 class="text-center mb-2" id="title">Compare</h1>
        <v-card-body>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="car1.brand" label="Car 1" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="car2.brand" label="Car 2" outlined />
            </v-col>
          </v-row>
          <div class="d-flex justify-center">
            <v-btn @click="compareCars" color="primary">Compare</v-btn>
          </div>
  
          <v-row v-if="comparisonResults.length">
            <v-col cols="12">
              <canvas id="comparisonChart" width="400" height="200"></canvas>
            </v-col>
            <v-col cols="12" class="mt-4">
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
  
  const car1 = ref({ brand: '', model: '' });
  const car2 = ref({ brand: '', model: '' });
  const comparisonResults = ref([]);
  const overallComment = ref('');
  
// Assuming you are importing getResponse from CompareCar.js

async function compareCars() {
  const userMessage = `Compare ${car1.value.brand} and ${car2.value.brand}. Please provide a score from 0 to 100 for performance, reliability, and comfort, and include an overall comment.`;

  try {
    const response = await getResponse(userMessage);
    
    console.log("API Response:", response);
    
    const results = response.split(';');
    if (results.length < 3) {
      throw new Error("Response format is incorrect.");
    }

    const [car1Data, car2Data] = results.slice(0, 2).map(car => {
  const carDetails = parseCarDetails(car);
  console.log("Parsed Car Data:", carDetails); // Log each parsed car data
  return carDetails;
});

// Log the results array to see its content
console.log("Results Array:", results);

// Check if results[3] is defined and log it
if (results[3] || results[4]|| results[5]) {
  console.log("Overall Comment String:", results[2]); // Log the overall comment string

  overallComment.value = results[2] || 'No overall comment provided.';

  console.log("Extracted Comment:", overallComment.value); // Log the extracted comment
} else {
  overallComment.value = results[2] || 'No overall comment provided.';
  console.log("No overall comment string found. Default message assigned.");
}


    comparisonResults.value = [
      {
        brand: car1.value.brand,
        performance: car1Data.Performance || 0,
        reliability: car1Data.Reliability || 0,
        comfort: car1Data.Comfort || 0,
      },
      {
        brand: car2.value.brand,
        performance: car2Data.Performance || 0,
        reliability: car2Data.Reliability || 0,
        comfort: car2Data.Comfort || 0,
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
      return { Performance: 0, Reliability: 0, Comfort: 0 };
    }
  
    const metrics = details.split(', ').reduce((acc, metric) => {
      const [key, value] = metric.split(': ');
      if (key && value) {
        acc[key.trim()] = parseInt(value.trim(), 10) || 0;
      } else {
        console.warn("Unexpected metric format:", metric);
      }
      return acc;
    }, {});
  
    return {
      Performance: metrics.Performance || 0,
      Reliability: metrics.Reliability || 0,
      Comfort: metrics.Comfort || 0,
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
            label: 'Performance',
            data: [comparisonResults.value[0].performance, comparisonResults.value[1].performance],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
          {
            label: 'Reliability',
            data: [comparisonResults.value[0].reliability, comparisonResults.value[1].reliability],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
          },
          {
            label: 'Comfort',
            data: [comparisonResults.value[0].comfort, comparisonResults.value[1].comfort],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
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
  