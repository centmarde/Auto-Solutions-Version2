<template>
  <v-app>
    <section id="home">
      <section id="index" class="lottie-container">
        <v-container fluid>
          <v-row justify="center">
            <v-col class="animation" cols="12"></v-col>
          </v-row>
        </v-container>
      </section>
      <h1 id="dino">Auto-Solutions</h1>

      <section class="gradient"></section>

      <div class="end-lottie"></div>

      <v-container fluid class="text-center" style="padding: 0">
        <v-row>
          <div></div>
          <v-col
            cols="12"
            lg="8"
            md="12"
            sm="12"
            style="background-color: #151515; z-index: 3"
          >
            <h5 class="text-center trs">
              Here at Auto Solutions, we offer a wide selection of cars suited
              for you. As a trusted service provider, we allow clients to upload
              their cars for selling or renting. Other clients can browse our
              platform to rent or buy cars. Our line of quality, durable, and
              reliable vehicles will address your needs and more!
            </h5>
          </v-col>
          <v-col
            cols="12"
            lg="4"
            md="12"
            sm="12"
            style="background-color: #151515; z-index: 3"
          >
            <v-row class="logo-container trsx">
              <v-col> </v-col>
              <v-col>
                <v-img
                  src="https://seeklogo.com/images/T/toyota-logo-3A02221675-seeklogo.com.png"
                  alt="Honda"
                  class="img-fluid"
              /></v-col>
              <v-col> </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAnimationStore } from "../stores/animationStore.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger);

const animationStore = useAnimationStore();

onMounted(async () => {
  if (!animationStore.animationData) {
    await animationStore.fetchAnimationData();
  }

  const lottieContainers = document.querySelectorAll(".animation");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          LottieScrollTrigger({
            trigger: entry.target,
            start: "top top",
            endTrigger: ".end-lottie",
            end: `bottom center += ${entry.target.offsetHeight}`,
            renderer: "svg",
            target: entry.target,
            animationData: animationStore.animationData,
            scrub: 0.5,
            fps: 60,
          });
          observer.unobserve(entry.target); // Stop observing after loading
        }
      });
    },
    { threshold: 0.1 }
  );

  lottieContainers.forEach((container) => {
    observer.observe(container);
  });
});

function LottieScrollTrigger(vars) {
  let playhead = { frame: 0 },
    target = gsap.utils.toArray(vars.target)[0],
    speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
    st = {
      trigger: vars.trigger || ".trigger",
      end: speeds[vars.speed] || "+=1300",
      scrub: vars.scrub || 1,
      markers: false,
    },
    ctx = gsap.context && gsap.context(),
    animation = lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || "svg",
      loop: false,
      autoplay: false,
      animationData: vars.animationData,
      rendererSettings: vars.rendererSettings || {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

  for (let p in vars) {
    st[p] = vars[p];
  }

  animation.addEventListener("DOMLoaded", function () {
    let createTween = function () {
      animation.frameTween = gsap.to(playhead, {
        frame: animation.totalFrames - 1,
        ease: "none",
        onUpdate: () => {
          requestAnimationFrame(() => {
            animation.goToAndStop(playhead.frame, true);
          });
        },
        scrollTrigger: st,
      });
      return () => animation.destroy && animation.destroy();
    };
    ctx && ctx.add ? ctx.add(createTween) : createTween();
  });

  // Additional GSAP animations for elements
  gsap.from(".trs", {
    scale: 0.8,
    opacity: 0,
    duration: 0.1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".trs",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".trsx", {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ".trs",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  return animation;
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /*  height: 100vh; */
}

#index {
  width: 100%;
  height: 800vh;
  background-color: #151515;
}

.lottie-container {
  position: fixed;
  width: 100vw;
  height: 5vh;
  top: 0;
  z-index: 0;
  filter: saturation(2);
}

.gradient {
  width: 100vw;
  height: 300vh;
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(21, 21, 21, 0) 0%,
    rgba(21, 21, 21, 1) 100%
  );
  z-index: 4;
}

.animation {
  height: 100vh;
  padding: 0;
}

@media (max-width: 768px) {
  .animation {
    height: 100vh;
    position: absolute;
  }
}

.trs {
  color: #eeeeee;
  font-family: "Merriweather", serif;
  padding: 2rem;
}

.logo-container {
  padding: 2rem;
}

#dino {
  color: #90a4ae;
  position: absolute;
  top: 35%;
  left: 50%;
  z-index: 888;
  transform: translate(-50%, -50%);
  font-family: "Merriweather", serif;
  font-size: 6rem;
  font-weight: bold;
}
@media (max-width: 1300px) and (min-width: 576px) {
  #dino {
    font-size: 6.5vw;
    top: 50%;
  }
}

@media (max-width: 576px) {
  #dino {
    font-size: 6vw;
    top: 45%;
  }
}
</style>
