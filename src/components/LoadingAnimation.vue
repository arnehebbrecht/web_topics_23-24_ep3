<template>
  <div
    class="loading-container"
    role="status"
    aria-live="polite"
    aria-labelledby="loading-message"
  >
    <div id="loading-content">
      <div ref="initialText" class="loading-text" id="loading-message">
        <div class="letter-container">
          <div ref="uLetter" class="letter" aria-hidden="true">U</div>
          <div ref="sLetter" class="letter" aria-hidden="true">C</div>
        </div>
        <div v-if="greeting" class="greeting-text" role="alert">
          {{ greeting }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "LoadingAnimation",
  data() {
    return {
      greeting: "", // Variable to store the greeting
      greetingInterval: null, // Interval ID for clearing
    };
  },
  mounted() {
    this.startAnimation();
    this.startGreetingUpdates();
  },
  beforeUnmount() {
    // Clear the interval when the component is destroyed
    if (this.greetingInterval) {
      clearInterval(this.greetingInterval);
    }
  },
  methods: {
    startAnimation() {
      console.log("Starting animation"); // Debugging line
      this.tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      const uLetter = this.$refs.uLetter;
      const sLetter = this.$refs.sLetter;

      this.tl
        .to([uLetter, sLetter], {
          delay: 0.25,
          rotation: 360,
          scale: 1.5,
          duration: 1,
          ease: "power2.inOut",
        })
        .to([uLetter, sLetter], { scale: 1, duration: 0.5, ease: "power2.inOut" }, "<")
        .to(uLetter, { x: -100, color: "#00ff00", duration: 1, ease: "power2.inOut" }) // Bright green
        .to(sLetter, { x: 115, color: "#ff00ff", duration: 1, ease: "power2.inOut" }, "<") // Bright magenta
        .to([uLetter, sLetter], {
          x: 0,
          z: 0,
          color: "#ffffff",
          duration: 1,
          ease: "power2.inOut",
        }) // Reset to white
        .to(uLetter, { rotation: 180, duration: 1, ease: "elastic" })
        .to(sLetter, { rotation: -180, duration: 1, ease: "elastic" }, "<")
        .to(uLetter, {
          rotationX: 360,
          z: 50,
          color: "#00ff00",
          duration: 1.5,
          ease: "back.inOut(1.7)",
        })
        .to(
          sLetter,
          {
            rotationY: 360,
            z: 50,
            color: "#ff00ff",
            duration: 1.5,
            ease: "back.inOut(1.7)",
          },
          "<"
        )
        .to([uLetter, sLetter], {
          rotation: "+=360",
          color: "#ffffff",
          duration: 1,
          ease: "power2.inOut",
        })
        .to([uLetter, sLetter], { opacity: 0, duration: 1, ease: "power1.inOut" })
        .to([uLetter, sLetter], {
          rotation: 0,
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        });
    },
    startGreetingUpdates() {
      // Create a new Worker instance
      const worker = new Worker(
        new URL("@/workers/GettingRandomGreeting.js", import.meta.url),
        { type: "module" }
      );

      worker.onmessage = (event) => {
        console.log("Greeting received:", event.data); // Debugging line
        this.greeting = event.data; // Set the greeting
      };

      worker.postMessage("start"); // Send an initial message to the worker

      // Fetch new greeting every 2 seconds
      this.greetingInterval = setInterval(() => {
        worker.postMessage("start"); // Request a new greeting from the worker
      }, 2500);
    },
  },
};
</script>
