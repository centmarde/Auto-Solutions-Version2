<template>
    <v-row class="model-viewer-container">
        
        <model-viewer id="modelViewer" src="/models/toyota_supra.glb" ar ar-modes="webxr scene-viewer quick-look" tone-mapping="neutral"
            poster="poster.webp" shadow-intensity="1.4" camera-orbit="-300deg 80deg 4m" 
            min-camera-orbit="auto auto 4.911m" max-camera-orbit="auto 100deg 9m" min-field-of-view="12deg"  
            ref="modelViewer" :camera-controls="isCameraControlEnabled" >
            <h1 class="headertext">Auto-Solutions</h1>
            <button id="engine" class="hotspot" slot="hotspot-1"
                data-position="-0.8591577229878414m 0.2675076114826115m 1.414183157525556m"
                data-normal="-0.008226973476527363m 0.6343190777223924m -0.7730275703652684m"
                data-visibility-attribute="visible"
                @click="zoomToHotspot('40.78414m 80.2675076114826115m 8.414183157525556m')">
                <div class="hotspot-annotation"></div>
            </button>
            <button id="tires" class="hotspot" slot="hotspot-1"
                data-position="-0.8591577229878414m 0.2675076114826115m 1.414183157525556m"
                data-normal="-0.008226973476527363m 0.6343190777223924m -0.7730275703652684m"
                data-visibility-attribute="visible"
                @click="zoomToHotspot('36.78414m 98.2675076114826115m 5.414183157525556m')">
                <div class="hotspot-annotation"></div>
            </button>
            <button id="back" class="hotspot" slot="hotspot-3"
                data-position="-0.017936046896674565m 0.6817013441585476m -1.9770060065888153m"
                data-normal="-0.006273411558989916m 0.2869887537758104m -0.9579134091939724m"
                data-visibility-attribute="visible"
                @click="zoomToHotspot('180.78414m 89.2675076114826115m 10.4525556m')">
                <div class="hotspot-annotation"></div>
            </button>
            <button id="interior" class="hotspot" slot="hotspot-4"
                data-position="0.6765970783473938m 1.011742867066152m -0.0439240954590262m"
                data-normal="0.9009793442485632m 0.433575908717354m 0.01575286060846306m"
                data-visibility-attribute="visible" @click="zoomToHotspot('230.6deg 78.33m -1.04m')">
                <div class="hotspot-annotation"></div>
            </button>
            <button id="body" class="hotspot" slot="hotspot-5"
                data-position="0.6799885454498241m 0.5826037127122909m 1.959285014032719m"
                data-normal="0.46335479226336795m 0.6328190420284213m 0.6203566688065846m"
                data-visibility-attribute="visible" @click="zoomToHotspot('340deg 85m 10.959285014032719m')">
                <div class="hotspot-annotation"></div>
            </button>
            <div class="progress-bar hide" slot="progress-bar">
                <div class="update-bar"></div>
            </div>

            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <button class="custom-button ms-1 mt-3" @click="BodyButton">
                            <router-link to="/Home" class="nav-link" >HOME</router-link>
                        </button>
                        <button class="custom-drpdown ms-1 mt-3 dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            MENU
                        </button>
                        <ul class="dropdown-menu">
                            <li><router-link to="/Honda" class="dropdown-item" >2024 HONDA CIVIC</router-link></li>
                            <li><router-link to="/Nissan" class="dropdown-item" >2024 NISSAN Z PERFORMANCE</router-link>
                            </li>
                        </ul>

                        
                    </div>
                    <div class=" spacer col me-10 d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center">
    <button class="custom-button my-auto d-flex align-items-center"> 
        <v-icon class="me-1 my-auto">mdi-shopping</v-icon> 
        <span>PURCHASE</span>
    </button>
  
    <button class="custom-button ms-2 mt-2 mt-md-0 d-flex align-items-center" @click="EngineButton"><v-icon class="me-1 my-auto">mdi-engine</v-icon> ENGINE</button>
    <button class="custom-button ms-2 mt-2 mt-md-0 d-flex align-items-center" @click="BodyButton"> <v-icon class="me-1 my-auto" >mdi-car</v-icon> BODY</button>
    <button class="custom-button ms-2 mt-2 mt-md-0 d-flex align-items-center" @click="BackButton"> <v-icon class="me-1 my-auto">mdi mdi-car-back</v-icon> TRUNK</button>
    <button class="custom-button ms-2 mt-2 mt-md-0 d-flex align-items-center" @click="TireButton"> <v-icon class="me-1 my-auto">mdi-tire</v-icon> TIRES</button>
    <button class="custom-button ms-2 mt-2 mt-md-0 d-flex align-items-center" @click="InteriorButton"> <v-icon class="me-1 my-auto" >mdi mdi-car-wrench</v-icon> INTERIOR</button>
    <button class="custom-button" @click="modalBody = true" style="display: none;">Open Modal</button>
 <!-- New Free Camera Button -->

</div>

                </div>

                <div v-if="modalBody" class="modal-overlay modal-card-body">
    <div class="card" style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-top: 2%; margin-left: auto; margin-right: 75%;">
      <div class="card-body">
        <v-row>
          <v-col cols="12" md="12" class="d-flex justify-content-start">
            <img class="img-float" src="https://cdn2.steamgriddb.com/file/sgdb-cdn/logo/5394571ecee05ab8323586a2f8971b65.png" style="width: 230px; height: 130px; left: -30px; top: 18px;" alt="Body Image">
            <p class="title-float" style="color: black; -webkit-text-stroke: 1px #EEEEEE; font-size: 25px; left: 12px; bottom: 20px;"><b>CUSTOM BODY PAINT</b></p>
            <p class="price-float">Price: $5,000</p>
          </v-col>
        </v-row>
      </div>
      <div class="d-flex justify-content-end">
        <button class="custom-button me-2 mb-1" @click="showMoreInfoBody('CUSTOM BODY PAINT')">More Info</button>
        <button class="custom-button me-2 mb-1" @click="chooseBody('CUSTOM BODY PAINT')">BUY</button>
      </div>
    </div>

    <div v-if="showColorButtons" class="color-buttons d-flex justify-content-around">
      <button class="color-button" @click="changeColor([0.933, 0.933, 0.933, 1])">
        <span class="color-circle" style="background-color: #EEEEEE;"></span>
      </button>

      <button class="color-button" @click="changeColor([0.89, 0.2, 0.38, 1])">
        <span class="color-circle" style="background-color: #e53461;"></span>
      </button>

      <button class="color-button" @click="changeColor([0.878, 0.537, 0, 1])">
        <span class="color-circle" style="background-color: #ff9d00;"></span>
      </button>

      <button class="color-button" @click="changeColor([0.090, 0.090, 0.090, 1])">
        <span class="color-circle" style="background-color: #151515;"></span>
      </button>

      <button class="color-button" @click="changeColor([0.199, 0.01, 0.01, 0])">
        <span class="color-circle" style="background-color: #730000;"></span>
      </button>

      <button class="color-button" @click="changeColor([0.25, 0.41, 0.88, 1], 'radial-gradient(circle, #4169e1, #8a99d9')">
        <span class="color-circle" style="background-color: #4169e1;"></span>
      </button>
    </div>
  </div>

  <v-dialog v-model="moreInfoModalBody" max-width="400">
    <v-card>
      <v-card-title>{{ selectedBody }}</v-card-title>
      <v-card-text>
        <p><b>Detailed Info:</b> {{ moreInfoBody.details }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closeMoreInfoBody">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


<div v-if="modalTire" class="modal-overlay modal-card-tires">
    <div class="card stunna"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none;  margin-left: auto; margin-right: 65%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
                   
										<img class="img-float2" src="https://static.vecteezy.com/system/resources/thumbnails/040/529/091/small_2x/ai-generated-3d-rendering-of-a-car-tire-or-rim-on-transparent-background-ai-generated-png.png" style="width: 145px; height: auto;"  alt="">
                    <p class="title-float" style="color: black; -webkit-text-stroke: 1px #EEEEEE; font-size: 25px;"><b>Kumho Majesty</b></p>
                    <p class="price-float">price: $9,800</p>
                </v-col>
             
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
           
            <button class="custom-button me-2 mb-1" @click="showMoreInfo('Kumho Majesty 9 Solus')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseTire('Kumho Majesty 9 Solus')">BUY</button>
        </div>
    </div>

    <div class="card stunna"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-left: auto; margin-right: 65%;">
        <div class="card-body">
            <v-row >
                <v-col cols="12" md="12" class="d-flex justify-content-start" >
									<img class="img-float" src="https://pngimg.com/d/car_wheel_PNG1075.png" style="width: 130px;" alt="">
                   
                    <p class="title-float" style="color: black; -webkit-text-stroke: 1px #EEEEEE; font-size: 25px;"><b>Hankook iON</b></p>
                    <p class="price-float">price: $8,200</p>

                </v-col>
              
               
            </v-row>
        </div>
        <div class="d-flex justify-content-end">

            <button class="custom-button me-2 mb-1" @click="showMoreInfo('Hankook iON Evo')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseTire('Hankook iON Evo')">BUY</button>
        </div>
    </div>

    <div class="card stunna"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-left: auto; margin-right: 65%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
									<img class="img-float" src="https://static.vecteezy.com/system/resources/thumbnails/040/529/214/small_2x/ai-generated-3d-rendering-of-a-car-tire-or-rim-on-transparent-background-ai-generated-png.png" style="width: 145px;" alt="">
                    <p class="title-float" style="color: black; -webkit-text-stroke: 1px #EEEEEE; font-size: 25px;"><b>Michelin</b></p>
                    <p class="price-float">price: $7,999</p>

                </v-col>
               
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
          
            <button class="custom-button me-2 mb-1" @click="showMoreInfo('Michelin Defender')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseTire('Michelin Defender')">BUY</button>
        </div>
    </div>
</div>

<!-- Separate modal for more information inaasd-->
<v-dialog v-model="moreInfoModal" max-width="400">
    <v-card>
        <v-card-title>{{ selectedTire }}</v-card-title>
        <v-card-text>
            <p><b>Size:</b> {{ moreInfo.size }}</p>
            <p><b>Speed Rating:</b> {{ moreInfo.speedRating }}</p>
            <p><b>Load Index:</b> {{ moreInfo.loadIndex }}</p>
            <p><b>Detailed Info:</b> {{ moreInfo.details }}</p>
            <p><b>Rims:</b> {{ moreInfo.rims }}</p>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="closeMoreInfo">Close</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

<div v-if="modalEngine" class="modal-overlay modal-card-engines">
    <div class="card stunna"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-left: auto; margin-right: 65%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
                    <img class="img-float" src="https://www.pngarts.com/files/16/Engine-PNG-HQ-Pic.png" style="width: 150px;" alt="Engine Image">
										<p class="title-float" style="color: black; -webkit-text-stroke: 1px #EEEEEE; font-size: 30px;"><b>2JZ-GTE</b></p>

                    <p class="price-float" >Price: $108,000</p>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
            <button class="custom-button me-2 mb-1" @click="showMoreInfoEngine('2JZ-GTE')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseEngine('2JZ-GTE')">BUY</button>
        </div>
    </div>

    <div class="card stunna"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-left: auto; margin-right: 65%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
                    <img class="img-float" src="https://www.pngmart.com/files/10/Car-Engine-PNG-HD.png" style="width: 150px;" alt="Engine Image 2">
                    <p class="title-float" style="color: black; -webkit-text-stroke: 1px #EEEEEE; font-size: 30px;"><b>B58B30M0</b></p>
                    <p class="price-float ">Price: $98,500</p>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
            <button class="custom-button me-2 mb-1" @click="showMoreInfoEngine('B58B30M0')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseEngine('B58B30M0')">BUY</button>
        </div>
    </div>

    <div class="card stunna" 
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-left: auto; margin-right: 65%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
                    <img class="img-float" src="https://www.picng.com/thumbnail/engine/png_engine_20068_small.png" style="width: 150px;" alt="Engine Image 3">
                    <p class="title-float" style="color: black; -webkit-text-stroke: 1px #EEEEEE; font-size: 30px;"><b>1JZ-GTE</b></p>
                    <p class="price-float">Price: $130,000</p>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
            <button class="custom-button me-2 mb-1" @click="showMoreInfoEngine('1JZ-GTE')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseEngine('1JZ-GTE')">BUY</button>
        </div>
    </div>
</div>

<!-- Separate modal for more informationas -->
<v-dialog v-model="moreInfoModalEngine" max-width="400">
    <v-card>
        <v-card-title>{{ selectedEngine }}</v-card-title>
        <v-card-text>
            <p><b>Horsepower:</b> {{ moreInfoEngine.horsepower }}</p>
            <p><b>Torque:</b> {{ moreInfoEngine.torque }}</p>
            <p><b>Fuel Type:</b> {{ moreInfoEngine.fuelType }}</p>
            <p><b>Detailed Info:</b> {{ moreInfoEngine.details }}</p>
            <p><b>Compatibility:</b> {{ moreInfoEngine.compatibility }}</p>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="closeMoreInfo">Close</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>


<div v-if="modalBack" class="modal-overlay modal-card-back">
    <div class="card"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-top: 2%; margin-left: auto; margin-right: 75%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
                    <img class="img-float" src="https://example.com/path/to/back_image.jpg" alt="Back Image">
                    <p class="title-float"><b>Back Model Name</b></p>
                    <p class="price-float">Price: $5,000</p>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
            <button class="custom-button me-2 mb-1" @click="showMoreInfoBack('Back Model Name')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseBack('Back Model Name')">BUY</button>
        </div>
    </div>

    <div class="card"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-top: 1%; margin-left: auto; margin-right: 75%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
                    <img class="img-float" src="https://example.com/path/to/back_image2.jpg" alt="Back Image 2">
                    <p class="title-float"><b>Another Back Model</b></p>
                    <p class="price-float">Price: $4,500</p>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
            <button class="custom-button me-2 mb-1" @click="showMoreInfoBack('Another Back Model')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseBack('Another Back Model')">BUY</button>
        </div>
    </div>

    <div class="card"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-top: 1%; margin-left: auto; margin-right: 75%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
                    <img class="img-float" src="https://example.com/path/to/back_image3.jpg" alt="Back Image 3">
                    <p class="title-float"><b>Premium Back Model</b></p>
                    <p class="price-float">Price: $6,500</p>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
            <button class="custom-button me-2 mb-1" @click="showMoreInfoBack('Premium Back Model')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseBack('Premium Back Model')">BUY</button>
        </div>
    </div>
</div>

<!-- Separate modal for more information about the back -->
<v-dialog v-model="moreInfoModalBack" max-width="400">
    <v-card>
        <v-card-title>{{ selectedBack }}</v-card-title>
        <v-card-text>
            <p><b>Material:</b> {{ moreInfoBack.material }}</p>
            <p><b>Weight:</b> {{ moreInfoBack.weight }}</p>
            <p><b>Compatibility:</b> {{ moreInfoBack.compatibility }}</p>
            <p><b>Detailed Info:</b> {{ moreInfoBack.details }}</p>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="closeMoreInfoBack">Close</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>


<div v-if="modalInterior" class="modal-overlay modal-card-interior">
    <div class="card"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-top: 2%; margin-left: auto; margin-right: 75%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
                    <img class="img-float" src="https://example.com/path/to/interior_image.jpg" alt="Interior Image">
                    <p class="title-float"><b>Interior Model Name</b></p>
                    <p class="price-float">Price: $3,000</p>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
            <button class="custom-button me-2 mb-1" @click="showMoreInfoInterior('Interior Model Name')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseInterior('Interior Model Name')">BUY</button>
        </div>
    </div>

    <div class="card"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-top: 1%; margin-left: auto; margin-right: 75%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
                    <img class="img-float" src="https://example.com/path/to/interior_image2.jpg" alt="Interior Image 2">
                    <p class="title-float"><b>Another Interior Model</b></p>
                    <p class="price-float">Price: $2,500</p>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
            <button class="custom-button me-2 mb-1" @click="showMoreInfoInterior('Another Interior Model')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseInterior('Another Interior Model')">BUY</button>
        </div>
    </div>

    <div class="card"
        style="width: 20rem; background: rgba(255, 255, 255, 0.9); border: none; margin-top: 1%; margin-left: auto; margin-right: 75%;">
        <div class="card-body">
            <v-row>
                <v-col cols="12" md="12" class="d-flex justify-content-start">
                    <img class="img-float" src="https://example.com/path/to/interior_image3.jpg" alt="Interior Image 3">
                    <p class="title-float"><b>Premium Interior Model</b></p>
                    <p class="price-float">Price: $4,000</p>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-content-end">
            <button class="custom-button me-2 mb-1" @click="showMoreInfoInterior('Premium Interior Model')">More Info</button>
            <button class="custom-button me-2 mb-1" @click="chooseInterior('Premium Interior Model')">BUY</button>
        </div>
    </div>
</div>

<!-- Separate modal for more information about the interior -->
<v-dialog v-model="moreInfoModalInterior" max-width="400">
    <v-card>
        <v-card-title>{{ selectedInterior }}</v-card-title>
        <v-card-text>
            <p><b>Material:</b> {{ moreInfoInterior.material }}</p>
            <p><b>Color:</b> {{ moreInfoInterior.color }}</p>
            <p><b>Features:</b> {{ moreInfoInterior.features }}</p>
            <p><b>Detailed Info:</b> {{ moreInfoInterior.details }}</p>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="closeMoreInfoInterior">Close</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>



            </div>
        </model-viewer>
    </v-row>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const modelViewer = ref(null);
    // Function to change the color of material 16
   

    // onMounted lifecycle hook to handle actions after component is mounted
    onMounted(() => {
      modelViewer.value.addEventListener('load', () => {
        const carModel = modelViewer.value?.model;
        const material = carModel?.materials?.[16];
        const material2 = carModel?.materials?.[5];
        if (material) {
          // Set initial color to red (#c43a30)
          material.pbrMetallicRoughness.setBaseColorFactor(([0.199, 0.01, 0.01, 0])
          );
          
        }
        if (material2) {
            material2.pbrMetallicRoughness.setBaseColorFactor([0.933, 0.933, 0.933, 1]);
        }
      });
    });

    return {
      modelViewer,
     
    };
  },
    name: 'ModelViewerComponent',
    data() {
        return {
            cameraOrbit: 'auto auto 6m',
            fieldOfView: '15.4deg',
            modalBody: false,
            modalBack: false,
            modalInterior: false,
            modalTire: false,
            modalEngine: false,
    moreInfoModal: false,
    moreInfoModalEngine: false,
    selectedTire: '',
    moreInfo: {
      size: '',
      speedRating: '',
      loadIndex: '',
      details: '',
      rims: ''
    },
    selectedEngine: '',
            moreInfoEngine: {
                horsepower: '',
                torque: '',
                fuelType: '',
                details: '',
                compatibility: ''
            },
						modalBack: false,
        moreInfoModalBack: false,
        selectedBack: '',
        moreInfoBack: {
            material: '',
            weight: '',
            compatibility: '',
            details: ''
        },
				modalInterior: false,
        moreInfoModalInterior: false,
        selectedInterior: '',
        moreInfoInterior: {
            material: '',
            color: '',
            features: '',
            details: ''
        },
				modalBody: false,
        moreInfoModalBody: false,
        showColorButtons: false,
        selectedBody: '',
        moreInfoBody: {
            details: ''
        }
   
        };
    },
    methods: {
     
        chooseBody(bodyName) {
      console.log(`You selected: ${bodyName}`);
      this.showColorButtons = true;
    },
    changeColor(colorArray) {
      console.log('Chosen color:', colorArray);
      const confirmation = window.confirm(`Are you sure you want to choose this color?`);
      if (confirmation) {
        // Set the color of the car model
        const carModel = this.modelViewer?.model;
        const material = carModel?.materials?.[16];
        if (material) {
          material.pbrMetallicRoughness.setBaseColorFactor(colorArray);
          console.log('Color confirmed and applied:', colorArray);
        }
      } else {
        console.log('Color selection canceled.');
      }
    },
    showMoreInfoBody(bodyName) {
        this.selectedBody = bodyName;
        // Populate more info details based on the selected body model
        if (bodyName === 'CUSTOM BODY PAINT') {
            this.moreInfoBody = {
                details: 'This body paint is a stunning representation of artistry and innovation designed to elevate the vehicles aesthetic appeal. Each layer of paint is expertly applied creating a rich depth of color that shimmers under various lighting conditions. The finish showcases a unique blend of high quality pigments providing not only a vibrant appearance but also exceptional durability against the elements. '
            };
      
        }
        this.moreInfoModalBody = true;
    },
    closeMoreInfoBody() {
        this.moreInfoModalBody = false;
    },
			chooseInterior(interiorName) {
        console.log(`You selected: ${interiorName}`);
        this.modalInterior = false; // Close the interior modal after selecting
    },
    showMoreInfoInterior(interiorName) {
        this.selectedInterior = interiorName;
        // Populate more info details based on the selected interior model
        if (interiorName === 'Interior Model Name') {
            this.moreInfoInterior = {
                material: 'Leather',
                color: 'Black',
                features: 'Heated seats, touchscreen display',
                details: 'A luxurious interior designed for comfort and style.'
            };
        } else if (interiorName === 'Another Interior Model') {
            this.moreInfoInterior = {
                material: 'Fabric',
                color: 'Gray',
                features: 'Eco-friendly materials, spacious design',
                details: 'An affordable and comfortable interior for everyday use.'
            };
        } else if (interiorName === 'Premium Interior Model') {
            this.moreInfoInterior = {
                material: 'Premium Leather',
                color: 'Tan',
                features: 'Ventilated seats, ambient lighting',
                details: 'An upscale interior with advanced features for luxury driving.'
            };
        }
        this.moreInfoModalInterior = true;
    },
    closeMoreInfoInterior() {
        this.moreInfoModalInterior = false;
    },
			chooseBack(backName) {
        console.log(`You selected: ${backName}`);
        this.modalBack = false; // Close the back modal after selecting
    },
    showMoreInfoBack(backName) {
        this.selectedBack = backName;
        // Populate more info details based on the selected back model
        if (backName === 'Back Model Name') {
            this.moreInfoBack = {
                material: 'Aluminum',
                weight: '150 lbs',
                compatibility: 'Compatible with various truck models.',
                details: 'A high-quality aluminum back designed for durability.'
            };
        } else if (backName === 'Another Back Model') {
            this.moreInfoBack = {
                material: 'Steel',
                weight: '200 lbs',
                compatibility: 'Designed for SUVs and vans.',
                details: 'A strong steel back for heavy-duty use.'
            };
        } else if (backName === 'Premium Back Model') {
            this.moreInfoBack = {
                material: 'Carbon Fiber',
                weight: '120 lbs',
                compatibility: 'Compatible with high-performance vehicles.',
                details: 'A lightweight carbon fiber back for enhanced performance.'
            };
        }
        this.moreInfoModalBack = true;
    },
    closeMoreInfoBack() {
        this.moreInfoModalBack = false;
    },
        chooseEngine(engineName) {
            console.log(`You selected: ${engineName}`);
            this.modalEngine = false; // Close the engine modal after selecting
        },
        showMoreInfoEngine(engineName) {
            // Set selected engine and populate more info details
            this.selectedEngine = engineName;
            if (engineName === '2JZ-GTE') {
                this.moreInfoEngine = {
                    horsepower: '250 HP',
                    torque: '300 Nm',
                    fuelType: 'Gasoline',
                    details: 'A powerful engine designed for high performance.',
                    compatibility: 'Compatible with various models of sedans and SUVs.',
                };
            } else if (engineName === 'B58B30M0') {
                this.moreInfoEngine = {
                    horsepower: '200 HP',
                    torque: '250 Nm',
                    fuelType: 'Diesel',
                    details: 'An efficient diesel engine for long-distance travel.',
                    compatibility: 'Designed for compact cars and hatchbacks.',
                };
            } else if (engineName === '1JZ-GTE') {
                this.moreInfoEngine = {
                    horsepower: '300 HP',
                    torque: '400 Nm',
                    fuelType: 'Hybrid',
                    details: 'An eco-friendly hybrid engine for maximum efficiency.',
                    compatibility: 'Compatible with luxury cars and high-end sedans.',
                };
            }
            this.moreInfoModalEngine = true
  
        },
       



        chooseTire(tireName) {
    console.log(`You selected: ${tireName}`);
    this.modalTire = false; // Close the tire modal after selecting
  },

 
  showMoreInfo(tireName) {
    // Set selected tire and populate more info details
    this.selectedTire = tireName;
  if (tireName === 'Kumho Majesty 9 Solus') {
  this.moreInfo = {
    size: '205/55R16',
    speedRating: 'V',
    loadIndex: '91',
    details: 'This is a high-performance tire suitable for wet and dry conditions.',
    rims: '16-inch alloy rims, designed for performance and durability.',
   
  };
} else if (tireName === 'Hankook iON Evo') {
  this.moreInfo = {
    size: '225/50R17',
    speedRating: 'H',
    loadIndex: '94',
    details: 'Eco-friendly tire optimized for electric vehicles.',
    rims: '17-inch aerodynamic rims, optimized for energy efficiency.',
    
  };
} else if (tireName === 'Michelin Defender') {
  this.moreInfo = {
    size: '235/60R18',
    speedRating: 'T',
    loadIndex: '103',
    details: 'Tough all-season tire with long tread life.',
    rims: '18-inch steel rims, known for toughness and strength in rugged conditions.',
    
  };
}

    this.moreInfoModal = true; // Open more info modal
  },
  closeMoreInfo() {
    this.moreInfoModal = false; 
    this.moreInfoModalEngine = false;
  },
        updateCamera(event) {
            const modelViewer = this.$refs.modelViewer;
            if (modelViewer) {
                this.cameraOrbit = modelViewer.cameraOrbit;
                this.fieldOfView = modelViewer.fieldOfView;
            }
        },
        zoomToHotspot(position) {
            const modelViewer = this.$refs.modelViewer;
            const [x, y, z] = position.split(' ').map(val => parseFloat(val));

            // Smoothly zoom in and move camera to the hotspot position
            if (modelViewer) {
                modelViewer.cameraOrbit = `-${x}deg ${y}deg ${z}m`;
                modelViewer.fieldOfView = '10deg';
                modelViewer.cameraTarget = `${x} ${y} ${z}`;
            }
        },
        BodyButton() {
            // Trigger a click on the BODY button
            const bodyButton = document.getElementById('body');
            if (bodyButton) {
                this.closeModal();
                bodyButton.click();

                // After 1-second delay, trigger the modal button click
                setTimeout(() => {
                    this.modalBody = true;
                }, 500); // 1000ms = 1 second
            }
        },
        BackButton() {
            const bodyButton = document.getElementById('back');
            if (bodyButton) {
                this.closeModal();
                bodyButton.click();

                setTimeout(() => {
                    this.modalBack = true;
                }, 500);
            }
        },
        InteriorButton() {
            const bodyButton = document.getElementById('interior');
            if (bodyButton) {
                this.closeModal();
                bodyButton.click();

                setTimeout(() => {
                    this.modalInterior = true;
                }, 500);
            }
        },
        TireButton() {
            const bodyButton = document.getElementById('tires');
            if (bodyButton) {
                this.closeModal();
                bodyButton.click();

                setTimeout(() => {
                    this.modalTire = true;
                }, 500); // 1000ms = 1 second
            }
        },
        EngineButton() {
            const bodyButton = document.getElementById('engine');
            if (bodyButton) {
                this.closeModal();
                bodyButton.click();

                setTimeout(() => {
                    this.modalEngine = true;
                }, 500); // 1000ms = 1 second
            }
        },
        closeModal() {
            this.modalBody = false;
            this.modalTire = false;
            this.modalBack = false;
            this.modalInterior = false;
            this.modalEngine = false;
        },
        handleButtonClick() {
            this.closeModal(); // Close modal when any button is clicked
        }
    },
    mounted() {
        const modelViewer = this.$refs.modelViewer;
        if (modelViewer) {
            modelViewer.addEventListener('camera-change', this.updateCamera);
        }
    },
    beforeDestroy() {
        const modelViewer = this.$refs.modelViewer;
        if (modelViewer) {
            modelViewer.removeEventListener('camera-change', this.updateCamera);
        }
    }
};
</script>


<style>
.model-viewer-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle, #EEEEEE, #b4b4b4);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0;
  overflow: hidden;
}
model-viewer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.hotspot {
    display: none;
}



.progress-bar {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 5px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.update-bar {
    height: 100%;
    background: #007bff;
    width: 0%;
    border-radius: 5px;
}


.stunna{
	margin-top: 3%;
}
@media only screen and (max-width: 1024px) {
    .headertext {
        font-size: 120px;
        top: 35%;
        transform: translate(-50%, -90%);
    }
}

@media only screen and (max-width: 768px) {
    .headertext {
        font-size: 80px;
        top: 30%;
        transform: translate(-50%, -85%);
    }

	
}

@media only screen and (max-width: 480px) {
    .headertext {
        margin-top: 110%;
        z-index: -1;
        transform: translate(-50%, -80%);
    }

		.stunna{
		margin-top: 12%;
	}
	
}

.custom-button {
    color: #151515;
    text-decoration: none;
    font-size: 15px;
    border: none;
    background: none;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
}
.custom-drpdown {
    color: #151515;
    text-decoration: none;
    font-size: 15px;
    border: none;
    background: none;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
}

.custom-button::before,
.custom-button::after {
    content: '';
    width: 0%;
    height: 2px;
    background: rgba(255, 0, 0, 0.5);
    display: block;
    transition: 0.5s;
}

.custom-button:hover::after,
.custom-button:hover::before {
    width: 100%;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
}

.btn-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #000;
}

.card-body {
    color: #000;
}

.modal-card-body {
width: 20rem; border: none; margin-top: 5%; margin-left: 72%; margin-right: auto;
}
.modal-card-Interior{
    width: 20rem; border: none; margin-top: 15%; margin-left: 60%; margin-right: auto;

}

/* Small screen */
@media (max-width: 768px) {
    .modal-card-body {
        position: fixed;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0; /* Override the original margins */
    }
    .modal-card-Interior {
        position: fixed;
        top: 78%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0; /* Override the original margins */
    }
    .modal-card-tires {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0; /* Override the original margins */
    }
    .spacer {
        position: relative;
        margin-top: 1.5rem; /* Increased margin for small screens */
    }
	
}

/* Large screen (above 768px) */
@media (min-width: 769px) {
    .spacer {
        position: relative;
        margin-top: 0.5rem; /* Reduced margin for larger screens */
    }
}



.img-float{
    position: absolute;
    width: 5.2rem;
    bottom: 1px;
}
.img-float2{
    position: absolute;
    width: 5.4rem;
    height: 6.5rem;
    bottom: 1px;
}
.title-float{
    position: relative;
    left: 7rem;
    font-size: 20px;
}
.price-float{
    position: absolute;
    right: 20px;
    font-size: 20px;
    top:3rem;
}
.color-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.color-button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.color-button:hover {
  transform: scale(1.1);
}

.color-circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-bottom: 5px;
  border: 1px solid #ddd;
}
</style>