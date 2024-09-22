<template>
    <Nav />
    <br><br><br><br>
    <div class="container">
      <div class="row">
        <div class="col"> <CarsForSale/></div>
      </div>
    </div>
    <div class="container">
      <hr> <br><br>
      <div class="row">
        <div class="col-12 col-lg-6 col-md-6 col-sm-12"><div >
          <div class="card-body"><SellCar/></div>
        </div>
      </div>
      <div class="col-12 col-lg-6 col-md-6 col-sm-12"><div>
          <div class="card-body"><CarRental/></div>
        </div></div>
      </div>
    </div>
    
    <br><br><br>
    <FeaturedCar/>
    <br><br>
    <!-- <Footer/> -->
    
  </template>
  
  <script setup>
  import { doLogout } from "../lib/supaBase";
  import Nav from '../layouts/InsideNavbar.vue';
  import FeaturedCar from '../layouts/FeaturedCar.vue';
  import SellCar from '../components/SellCar.vue';
//   import HeroHome from "../../includes/HomeSection/HeroHome.vue";
  import CarsForSale from "../layouts/CarsForSale.vue";
  import CarRental from "../layouts/CarRental.vue";
//   import Footer from '../../includes/HeroSection/Footer.vue';

  
  
  const logout = async () => {
    await doLogout();
  };
  </script>
  