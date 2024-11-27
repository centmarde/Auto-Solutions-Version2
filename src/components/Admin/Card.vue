<template>
  <v-card
    class="mx-auto hoverable"
    max-width="344"
    elevation="8"
    :style="{
      backgroundColor: cardBackgroundColor,
      borderColor: cardBorderColor,
    }"
  >
    <v-card-text>
      <div>{{ title }}</div>
      <p class="text-h4 font-weight-black">{{ num }}</p>

      <!-- Conditionally display details based on the title -->
      <p v-if="title == 'Total Cars for Sale'">
        These are the cars currently available for sale.
      </p>
      <p v-if="title == 'Total Cars for Rent'">
        These cars are available for rent.
      </p>
      <p v-if="title == 'Car Purchased'">These cars have been purchased.</p>
      <p v-if="title == 'Car Rented'">These cars have been rented.</p>
      <p v-if="title == 'Loaned Cars'">These cars are currently on loan.</p>
    </v-card-text>

    <v-card-actions>
      <!-- Button that navigates to the link -->
      <RouterLink :to="link">
        <v-btn color="teal-accent-4" variant="text">
          {{ send }}
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </RouterLink>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { RouterLink } from "vue-router";

// Define props for title, num, send, and link
const props = defineProps({
  title: {
    type: String,
    default: "No title",
  },
  num: {
    type: Number,
    default: 0,
    validator: (value) => Number.isInteger(value),
  },
  send: {
    type: String,
    default: "View",
  },
  link: {
    type: String,
    default: "/notfound",
  },
  cardType: {
    type: String,
    default: "default", // To distinguish card types
  },
});

// Define card colors based on type
const cardColors = {
  "Total Cars for Sale": {
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    borderColor: "rgba(75, 192, 192, 1)",
  },
  "Total Cars for Rent": {
    backgroundColor: "rgba(153, 102, 255, 0.2)",
    borderColor: "rgba(153, 102, 255, 1)",
  },
  "Car Purchased": {
    backgroundColor: "rgba(255, 159, 64, 0.2)",
    borderColor: "rgba(255, 159, 64, 1)",
  },
  "Car Rented": {
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    borderColor: "rgba(54, 162, 235, 1)",
  },
  "Loaned Cars": {
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    borderColor: "rgba(75, 192, 192, 1)",
  },
};

// Computed properties for background and border colors based on the title
const cardBackgroundColor = computed(
  () => cardColors[props.title]?.backgroundColor || "white"
);
const cardBorderColor = computed(
  () => cardColors[props.title]?.borderColor || "transparent"
);

// Dynamic link based on the card title
const link = computed(() => {
  if (props.title === "Loaned Cars") {
    return "/LoaningCars"; // The route for the Loaning Cars page
  }
  return props.link; // Default link if not Loaned Cars
});
</script>

<style scoped>
/* Add hover effect for further lift */
.hoverable:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
