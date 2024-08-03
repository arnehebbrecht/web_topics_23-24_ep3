<template>
  <div class="loading-container">
    <div id="loading-content">
      <div ref="initialText" class="loading-text">
        <div class="letter-container">
          <div ref="uLetter" class="letter">U</div>
          <div ref="sLetter" class="letter">s</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "LoadingAnimation",
  mounted() {
    this.startAnimation();
    this.startWorker();
  },
  methods: {
    startAnimation() {
      console.log('Starting animation'); // Debugging line
      this.tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });

      const uLetter = this.$refs.uLetter;
      const sLetter = this.$refs.sLetter;

      this.tl.to(uLetter, { rotation: 360, duration: 1.5, ease: "linear" })
        .to(sLetter, { rotation: -360, duration: 1.5, ease: "linear" }, "<")
        .to(uLetter, { x: -100, duration: 1, ease: "power1.inOut" })
        .to(sLetter, { x: 115, duration: 1, ease: "power1.inOut" }, "<")
        .to(uLetter, { x: 0, duration: 1, ease: "power1.inOut" })
        .to(sLetter, { x: 0, duration: 1, ease: "power1.inOut" }, "<")
        .to(uLetter, { rotation: "-=360", duration: 1.5, ease: "linear" })
        .to(sLetter, { rotation: "+=360", duration: 1.5, ease: "linear" }, "<");
    },

    startWorker() {
      this.worker = new Worker(new URL('@/workers/loadingWorker.js', import.meta.url), { type: 'module' });

      this.worker.onmessage = (event) => {
        console.log('Received message from worker:', event.data); // Debugging line

        if (!event.data.done) {
          this.startAnimation(); // Start the animation again
        }
      };

      this.worker.onerror = (error) => {
        console.error("Worker error:", error);
      };

      // Send initial message to the worker if necessary
      this.worker.postMessage({ start: true });
    },

    stopAnimation() {
    console.log('Stopping animation'); // Debugging line
    if (this.tl) {
      this.tl.seek(this.tl.duration()); // Jump to the end of the animation timeline
    }
  }

  },
  beforeUnmount() {
    if (this.worker) {
      this.worker.terminate(); // Clean up worker
    }
  },
};
</script>

<style>
body,
html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  font-family: Arial, sans-serif;
  overflow: hidden;
  position: relative;
}

.loading-container {
  text-align: center;
  position: relative;
  z-index: 1;
  width: 100vw;
  overflow: hidden;
}

.loading-text {
  font-size: 4rem;
  color: white;
}

.letter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.letter {
  margin: 0;
}
</style>
