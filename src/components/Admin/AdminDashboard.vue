<template>
  <div class="w-100 d-flex h-100 gap-5">
    <Sidebar />
    <div class="d-flex justify-content-center gap-5 w-100 flex-wrap mb-6">
      <div class="row gap-5 justify-content-center mt">
        <canvas id="barChart" width="400" height="150"></canvas>
        <Card
          class="col-6"
          title="Total Cars for Sale"
          link="/CarInSale"
          :num="carCount"
          send="View Car Sale list History "
        />
        <Card
          class="col-6"
          title="Total Cars for Rent"
          link="/CarInRent"
          :num="totalCarsForRent"
        />
        <Card
          class="col-6"
          title="Car Purchased"
          link="/CarBeenPurchased"
          :num="purchasedCount"
        />
        <Card
          class="col-6"
          title="Car Rented"
          link="/Rented"
          :num="rentedCount"
        />
        <!-- New Card for Loaned Cars -->
        <Card
          class="col-6"
          title="Loaned Cars"
          link="/LoanedCars"
          :num="loanedCount"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart } from "chart.js";
import { useTheme } from "vuetify";
import { supabase, doLogout as supabaseLogout } from "../../lib/supaBase";
import Card from "./Card.vue";
import Sidebar from "./Sidebar.vue";

const theme = useTheme();
let chartInstance = null;

const carCount = ref(0);
const totalCarsForRent = ref(0);
const purchasedCount = ref(0);
const rentedCount = ref(0);
const loanedCount = ref(0); // New ref for loaned cars

const fetchCarCount = async () => {
  try {
    // Fetch the car IDs from the purchased_cars table
    const { data: purchasedCars, error: purchasedError } = await supabase
      .from("purchased_cars")
      .select("car_id"); // Assuming car_id is the column that references the car in the cars table

    if (purchasedError) throw purchasedError;

    const purchasedCarIds = purchasedCars.map((car) => car.car_id); // Extracting the car_ids from the purchased_cars data

    // Fetch cars for sale excluding those already purchased
    const { data, error } = await supabase
      .from("cars")
      .select("id")
      .eq("for_sale", true)
      .eq("is_pending", false)
      .not("id", "in", `(${purchasedCarIds.join(",")})`); // Excluding purchased cars

    if (error) throw error;

    carCount.value = data.length;
  } catch (err) {
    console.error("Error fetching car count:", err.message);
  }
};

const fetchRentedCarsCount = async () => {
  try {
    const { data, error } = await supabase
      .from("rented_cars")
      .select("id")
      .eq("is_paid", true);

    if (error) throw error;

    rentedCount.value = data.length;
  } catch (err) {
    console.error("Error fetching rented car count:", err.message);
  }
};

const fetchLoanedCarsCount = async () => {
  try {
    const { data, error } = await supabase.from("approved_loans").select("id"); // Fetch loaned cars

    if (error) throw error;

    loanedCount.value = data.length;
  } catch (err) {
    console.error("Error fetching loaned car count:", err.message);
  }
};
const fetchtotalCarsForRent = async () => {
  try {
    // Fetch the car IDs from the rented_cars table
    const { data: rentedCars, error: rentedError } = await supabase
      .from("rented_cars")
      .select("cars_id"); // Ensure 'car_id' matches the column name in the rented_cars table

    if (rentedError) throw rentedError;

    const rentedCarIds = rentedCars.map((cars) => cars.cars_id); // Extracting the car_ids from the rented_cars data

    // Fetch cars for rent excluding those already rented
    const { data, error } = await supabase
      .from("cars")
      .select("id")
      .eq("for_rent", true)
      .eq("is_pending", false)
      .not("id", "in", `(${rentedCarIds.join(",")})`); // Excluding rented cars

    if (error) throw error;

    totalCarsForRent.value = data.length;
  } catch (err) {
    console.error("Error fetching cars for rent count:", err.message);
  }
};

const fetchtotalCarsPurchased = async () => {
  try {
    const { data, error } = await supabase
      .from("purchased_cars")
      .select("id") // Only select the ID column (or other columns you need)
      .eq("is_paid", true); // Add condition for is_paid being true

    if (error) throw error;

    purchasedCount.value = data.length;
  } catch (err) {
    console.error("Error fetching purchased car count:", err.message);
  }
};

const initializeBarChart = () => {
  const ctx = document.getElementById("barChart").getContext("2d");

  const textColor = theme.global.current.value.dark
    ? "rgba(255, 255, 255, 1)"
    : "rgba(0, 0, 0, 0.8)";

  const data = {
    labels: [
      "For Sale", // Label for cars for sale
      "For Rent", // Label for cars for rent
      "Car Purchased", // Label for cars purchased
      "Car Rented", // Label for cars rented
      "Loaned Cars", // Label for loaned cars
    ],
    datasets: [
      {
        label: "Hide Graph",
        data: [
          carCount.value, // For Sale
          totalCarsForRent.value, // For Rent
          purchasedCount.value, // Car Purchased
          rentedCount.value, // Car Rented
          loanedCount.value, // Loaned Cars
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", // For Sale
          "rgba(153, 102, 255, 0.2)", // For Rent
          "rgba(255, 159, 64, 0.2)", // Car Purchased
          "rgba(54, 162, 235, 0.2)", // Car Rented
          "rgba(255, 99, 132, 0.2)", // Loaned Cars (New color)
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // For Sale
          "rgba(153, 102, 255, 1)", // For Rent
          "rgba(255, 159, 64, 1)", // Car Purchased
          "rgba(54, 162, 235, 1)", // Car Rented
          "rgba(255, 99, 132, 1)", // Loaned Cars (New border color)
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColor,
          },
          grid: {
            color: theme.global.current.value.dark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
          },
        },
        x: {
          ticks: {
            color: textColor,
          },
          grid: {
            color: theme.global.current.value.dark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    },
  };

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, config);
};

onMounted(async () => {
  await fetchCarCount();
  await fetchtotalCarsForRent();
  await fetchtotalCarsPurchased();
  await fetchRentedCarsCount();
  await fetchLoanedCarsCount(); // Fetch loaned cars data
  initializeBarChart();
});

watch(
  () => theme.global.current.value.dark,
  () => {
    initializeBarChart();
  }
);

const toggleTheme = () => {
  const newTheme = theme.global.current.value.dark ? "light" : "dark";
  theme.global.name.value = newTheme;
  localStorage.setItem("theme", newTheme);
};

const handleLogout = async () => {
  try {
    await supabaseLogout();
    localStorage.removeItem("user_id");
    localStorage.removeItem("axios_id");
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>

<style>
/* Apply Tipperary font globally */
* {
  font-family: "Tipperary", sans-serif;
}

.underline {
  text-decoration: underline;
}
#fonts {
  font-size: 1.2rem;
  font-family: "Tipperary", sans-serif;
}
.bot {
  margin-top: -35px;
}
.tops {
  top: 350px;
}
.mt {
  margin-top: 100px;
}
</style>
