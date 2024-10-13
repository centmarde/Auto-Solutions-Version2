<template>
    <div v-if="isVisible" class="modal-overlay modal-card-body">
      <div class="card"
           style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-top: 2%; margin-left: auto; margin-right: 75%;">
        <div class="card-body">
          <v-row>
            <v-col cols="12" md="12" class="d-flex justify-content-start">
              <img class="img-float" src="https://example.com/path/to/body_image.jpg" alt="Body Image">
              <p class="title-float"><b>Body Model Name</b></p>
              <p class="price-float">Price: $5,000</p>
            </v-col>
          </v-row>
        </div>
        <div class="d-flex justify-content-end">
          <button class="custom-button me-2 mb-1" @click="showMoreInfoBody('Body Model Name')">More Info</button>
          <button class="custom-button me-2 mb-1" @click="chooseBody('Body Model Name')">BUY</button>
        </div>
      </div>
  
      <div class="card"
           style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-top: 1%; margin-left: auto; margin-right: 75%;">
        <div class="card-body">
          <v-row>
            <v-col cols="12" md="12" class="d-flex justify-content-start">
              <img class="img-float" src="https://example.com/path/to/body_image2.jpg" alt="Body Image 2">
              <p class="title-float"><b>Another Body Model</b></p>
              <p class="price-float">Price: $4,500</p>
            </v-col>
          </v-row>
        </div>
        <div class="d-flex justify-content-end">
          <button class="custom-button me-2 mb-1" @click="showMoreInfoBody('Another Body Model')">More Info</button>
          <button class="custom-button me-2 mb-1" @click="chooseBody('Another Body Model')">BUY</button>
        </div>
      </div>
  
      <div class="card"
           style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-top: 1%; margin-left: auto; margin-right: 75%;">
        <div class="card-body">
          <v-row>
            <v-col cols="12" md="12" class="d-flex justify-content-start">
              <img class="img-float" src="https://example.com/path/to/body_image3.jpg" alt="Body Image 3">
              <p class="title-float"><b>Premium Body Model</b></p>
              <p class="price-float">Price: $6,000</p>
            </v-col>
          </v-row>
        </div>
        <div class="d-flex justify-content-end">
          <button class="custom-button me-2 mb-1" @click="showMoreInfoBody('Premium Body Model')">More Info</button>
          <button class="custom-button me-2 mb-1" @click="chooseBody('Premium Body Model')">BUY</button>
        </div>
      </div>
  
      <v-dialog v-model="moreInfoModalBody" max-width="400">
        <v-card>
          <v-card-title>{{ selectedBody }}</v-card-title>
          <v-card-text>
            <p><b>Material:</b> {{ moreInfoBody.material }}</p>
            <p><b>Dimensions:</b> {{ moreInfoBody.dimensions }}</p>
            <p><b>Features:</b> {{ moreInfoBody.features }}</p>
            <p><b>Detailed Info:</b> {{ moreInfoBody.details }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="closeMoreInfoBody">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BodyModalComponent',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        modalBody: false,
        moreInfoModalBody: false,
        selectedBody: '',
        moreInfoBody: {
          material: '',
          dimensions: '',
          features: '',
          details: ''
        }
      };
    },
    methods: {
      chooseBody(bodyName) {
        console.log(`You selected: ${bodyName}`);
        this.modalBody = false; // Close the body modal after selecting
      },
      showMoreInfoBody(bodyName) {
        this.selectedBody = bodyName;
        // Populate more info details based on the selected body model
        if (bodyName === 'Body Model Name') {
          this.moreInfoBody = {
            material: 'Steel',
            dimensions: 'L: 4.5m, W: 1.8m, H: 1.5m',
            features: 'Aerodynamic design, lightweight structure',
            details: 'A robust body designed for enhanced performance and safety.'
          };
        } else if (bodyName === 'Another Body Model') {
          this.moreInfoBody = {
            material: 'Aluminum',
            dimensions: 'L: 4.2m, W: 1.7m, H: 1.4m',
            features: 'High strength-to-weight ratio, corrosion-resistant',
            details: 'An efficient body designed for fuel economy and durability.'
          };
        } else if (bodyName === 'Premium Body Model') {
          this.moreInfoBody = {
            material: 'Carbon Fiber',
            dimensions: 'L: 4.8m, W: 1.9m, H: 1.6m',
            features: 'Lightweight, high performance, customizable',
            details: 'A premium body offering exceptional performance and style.'
          };
        }
        this.moreInfoModalBody = true;
      },
      closeMoreInfoBody() {
        this.moreInfoModalBody = false;
      },
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .img-float {
    max-width: 100%;
    height: auto;
  }
  
  .title-float {
    margin: 10px 0;
  }
  
  .price-float {
    font-weight: bold;
  }
  
  .custom-button {
    background-color: #1976d2; 
    color: white; 
    border: none; 
    padding: 8px 12px; 
    border-radius: 4px; 
    cursor: pointer; 
  }
  </style>
  