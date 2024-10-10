// router/index.ts

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes as autoRoutes } from "vue-router/auto-routes";

// Importing components
import Hero from "../pages/index.vue";
import CarInSale from "../pages/adminPages/CarInSale.vue";
import Login from "@/components/Login.vue";
import NotFound from "@/components/Notfoundpage.vue";
import Register from "@/components/Register.vue";

import Home from "@/pages/Home.vue";
import CarInRent from "@/pages/adminPages/CarInRent.vue";
import ViewAsClient from "@/pages/adminPages/ViewAsClient.vue";
import CarDetails from "@/layouts/CarDetails.vue";
import SellContents from "@/components/SellContents.vue";
import Admin from "@/pages/adminPages/Admin.vue";
import UserInfo from "@/components/UserInfo.vue";
import Supra from "@/layouts/Supra.vue";
import Nissan from "@/layouts/Nissan.vue";
import Honda from "@/layouts/Honda.vue";
import Inquires from "@/components/InquiresPage/Inquires.vue";
import CarListing from "@/components/InquiresPage/CarListing.vue";
import CarSaleView from "@/components/Admin/CarSaleView.vue";
import RentContents from "@/components/RentContents.vue";
import Garage from "@/components/InquiresPage/Garage.vue";
import RentedCars from "@/components/InquiresPage/RentedCars.vue";
import Chat from "@/components/Chat.vue";
import Inbox from "@/layouts/Inbox.vue";
import GarageContents from "@/components/GarageContents.vue";

const routes = setupLayouts([
  ...autoRoutes,
  { path: "/", component: Hero, meta: { hideAi: true } },
  { path: "/login", component: Login },
  { path: "/Register", component: Register },
  { path: "/:pathMatch(.*)*", component: NotFound },
  { path: "/CarInSale", component: CarInSale },

  { path: "/Home", component: Home, meta: { requiresAuth: true } },
  {
    path: "/SellContents",
    component: SellContents,
    meta: { requiresAuth: true },
  },
  {
    path: "/car/:id",
    component: CarDetails,
    name: "CarDetails",
    meta: { requiresAuth: true },
  },
  { path: "/Admin", component: Admin, meta: { requiresAuth: true } },
  { path: "/Inquires", component: Inquires, meta: { requiresAuth: true } },
  { path: "/UserInfo", component: UserInfo, meta: { requiresAuth: true } },
  { path: "/Supra", component: Supra, meta: { requiresAuth: true } },
  { path: "/Nissan", component: Nissan, meta: { requiresAuth: true } },
  { path: "/Honda", component: Honda, meta: { requiresAuth: true } },
  {
    path: "/Chat",
    component: Chat,
    meta: { requiresAuth: true },
    props: (route) => ({
      sellerId: route.query.seller_id,
      carId: route.query.car_id,
      buyerId: route.query.buyer_id,
      chatId: route.query.chat_id,
    }),
  },
  { path: "/Inbox", component: Inbox, meta: { requiresAuth: true } },
  { path: "/GarageContents", component: GarageContents, meta: { requiresAuth: true } },
  {
    path: "/RentContents",
    component: RentContents,
    meta: { requiresAuth: true },
  },
  { path: "/Garage", component: Garage, meta: { requiresAuth: true } },
  { path: "/RentedCars", component: RentedCars, meta: { requiresAuth: true } },

  { path: "/CarListing", component: CarListing, meta: { requiresAuth: true } },
  {
    path: "/CarSaleView",
    component: CarSaleView,
    meta: { requiresAuth: true },
  },
  {
    path: "/CarInRent",
    component: CarInRent,
    meta: { requiresAuth: true },
  },
  {
    path: "/ClientView",
    component: ViewAsClient,
    meta: { requiresAuth: true },
  },
]);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for dynamic imports
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

// Authentication guards
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const userRole = JSON.parse(localStorage.getItem("Role")); 
  const hasVisitedDashboard = JSON.parse(localStorage.getItem("hasVisitedDashboard")) || false;

  const publicPages = ["/", "/login", "/Register"];
  const protectedPages = ["/Home", "/car/:id", "/SellContents", "/Admin", "/UserInfo", "/Supra", "/Nissan", "/Honda", "/Inquires", "/CarListing", "/CarSaleView", "/RentContents", "/Garage", "/RentedCars", "/Chat", "/Inbox", "/GarageContents"];

  if (protectedPages.includes(to.path) && !isLoggedIn) {
    return next("/");
  }

  if (isLoggedIn && userRole === true && !hasVisitedDashboard) {
    localStorage.setItem("hasVisitedDashboard", true);
    return next("/Admin");
  }

  if (publicPages.includes(to.path) && isLoggedIn) {
    return next("/Home");
  }

  if (to.path.startsWith("/Admin") && userRole !== true) {
    alert("You do not have permission to access this page.");
    return next("/Home");
  }

  next();
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
