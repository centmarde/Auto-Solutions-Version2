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
import ClientMember from "@/pages/adminPages/ClientMember.vue";
import AdminMembers from "@/pages/adminPages/AdminMembers.vue";
import CarBeenPurchased from "@/pages/adminPages/CarBeenPurchased.vue";
import LoanedCars from "@/pages/adminPages/LoanedCars.vue";
import AdminReview from "@/pages/adminPages/AdminReview.vue";
import LoanReview from "@/pages/adminPages/LoanReview.vue";
import HandlingPage from "@/components/NavigationBar/HandlingPage.vue";
import AnniversaryPage from "@/components/NavigationBar/AnniversaryPage.vue";
import LoanCarBase from "@/components/LoanCar/LoanCarBase.vue";
import Mypurchased from "@/components/InquiresPage/Mypurchased.vue";
import Featured from "@/pages/Featured.vue";
import MainComponent from "@/components/NavigationBar/MainComponent.vue";
import Rented from "@/pages/adminPages/RentedCars.vue";

const routes = setupLayouts([
  ...autoRoutes,
  { path: "/", component: Hero, meta: { hideAi: true } },
  { path: "/login", component: Login, meta: { hideAi: false } },
  { path: "/Register", component: Register, meta: { hideAi: false } },
  { path: "/:pathMatch(.*)*", component: NotFound, meta: { hideAi: false } },
  { path: "/CarInSale", component: CarInSale, meta: { requiresAuth: true } },
  {
    path: "/PurchasedCars",
    component: Mypurchased,
    meta: { requiresAuth: true },
  },
  {
    path: "/LoanCarBase",
    component: LoanCarBase,
    meta: { requiresAuth: true },
  },

  { path: "/Home", component: Home, meta: { requiresAuth: true } },
  {
    path: "/SellContents",
    component: SellContents,
    meta: { requiresAuth: true, hideAi: true },
  },
  {
    path: "/car/:id",
    component: CarDetails,
    name: "CarDetails",
    meta: { requiresAuth: true, hideAi: true },
  },
  {
    path: "/Admin",
    component: Admin,
    meta: { requiresAuth: true, hideAi: true },
  },
  {
    path: "/Inquires",
    component: Inquires,
    meta: { requiresAuth: true, hideAi: true },
  },
  {
    path: "/UserInfo",
    component: UserInfo,
    meta: { requiresAuth: true, hideAi: true },
  },
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
  {
    path: "/GarageContents",
    component: GarageContents,
    meta: { requiresAuth: true, hideAi: true },
  },

  {
    path: "/RentContents",
    component: RentContents,
    meta: { requiresAuth: true, hideAi: true },
  },
  {
    path: "/Garage",
    component: Garage,
    meta: { requiresAuth: true, hideAi: true },
  },
  {
    path: "/RentedCars",
    component: RentedCars,
    meta: { requiresAuth: true, hideAi: true },
  },

  {
    path: "/CarListing",
    component: CarListing,
    meta: { requiresAuth: true, hideAi: true },
  },

  {
    path: "/CarInRent",
    component: CarInRent,
    meta: { requiresAuth: true },
  },

  {
    path: "/Clients",
    component: ClientMember,
    meta: { requiresAuth: true },
  },
  {
    path: "/AdminMembers",
    component: AdminMembers,
    meta: { requiresAuth: true },
  },
  {
    path: "/CarBeenPurchased",
    component: CarBeenPurchased,
    meta: { requiresAuth: true },
  },
  {
    path: "/LoanedCars",
    component: LoanedCars,
    meta: { requiresAuth: true },
  },
  {
    path: "/AdminReview",
    component: AdminReview,
    meta: { requiresAuth: true },
  },
  {
    path: "/LoanReview",
    component: LoanReview,
    meta: { requiresAuth: true },
  },
  {
    path: "/HandlingPage",
    component: HandlingPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/AnniversaryPage",
    component: AnniversaryPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/Featured",
    component: Featured,
    meta: { requiresAuth: true },
  },
  {
    path: "/MainComponent",
    component: MainComponent,
    meta: { requiresAuth: true },
  },
  {
    path: "/Rented",
    component: Rented,
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
  const hasVisitedDashboard =
    JSON.parse(localStorage.getItem("hasVisitedDashboard")) || false;

  console.log(userRole);
  const publicPages = ["/", "/login", "/register"];
  const protectedPages = [
    "/Home",
    "/car/:id",
    "/SellContents",
    "/Admin",
    "/UserInfo",
    "/Supra",
    "/Nissan",
    "/Honda",
    "/Inquires",
    "/CarListing",
    "/CarSaleView",
    "/RentContents",
    "/Garage",
    "/RentedCars",
    "/Chat",
    "/Inbox",
    "/GarageContents",
    "/HandlingPage",
    "/AnniversaryPage",
    "/LoanCarBase",
    "/PurchasedCars",
    "/Rented",
  ];

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

  if (
    (to.path.startsWith("/Admin") ||
      to.path.startsWith("/CarInRent") ||
      to.path.startsWith("/ClientView") ||
      to.path.startsWith("/CarBeenPurchased") ||
      to.path.startsWith("/LoanedCars") ||
      to.path.startsWith("/CarInSale") ||
      to.path.startsWith("/Clients")) &&
    userRole !== true
  ) {
    alert("You do not have permission to access this page.");
    return next("/Home");
  }

  next();
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
