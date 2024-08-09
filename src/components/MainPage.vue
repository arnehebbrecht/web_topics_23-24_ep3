<template>
  <div class="loading-container" role="presentation">
    <div id="loading-content">
      <div ref="urbanText" class="urban-text">
        <span class="urban-letter">U</span>
        <span class="urban-letter">r</span>
        <span class="urban-letter">b</span>
        <span class="urban-letter">a</span>
        <span class="urban-letter">n</span>
      </div>

      <div ref="chroniclesText" class="chronicles-text">
        <span class="chronicles-letter">C</span>
        <span class="chronicles-letter">h</span>
        <span class="chronicles-letter">r</span>
        <span class="chronicles-letter">o</span>
        <span class="chronicles-letter">n</span>
        <span class="chronicles-letter">i</span>
        <span class="chronicles-letter">c</span>
        <span class="chronicles-letter">l</span>
        <span class="chronicles-letter">e</span>
        <span class="chronicles-letter">s</span>
      </div>
    </div>
    <div
      ref="backgroundImage"
      class="background-image"
      role="img"
      aria-label="Decorative background image"
    ></div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "LoadingAnimation",
  mounted() {
    const urbanText = this.$refs.urbanText;
    const urbanLetters = urbanText.querySelectorAll(".urban-letter");
    const chroniclesText = this.$refs.chroniclesText;
    const chroniclesLetters = chroniclesText.querySelectorAll(".chronicles-letter");
    const backgroundImage = this.$refs.backgroundImage;

    const tl = gsap.timeline();

    tl.fromTo(
      urbanLetters,
      { opacity: 0, y: 20, color: "white" },
      { opacity: 1, y: 0, color: "white", stagger: 0.1, duration: 1 }
    );

    tl.fromTo(
      chroniclesLetters,
      { opacity: 0, y: 20, color: "white" },
      { opacity: 1, y: 0, color: "white", stagger: 0.1, duration: 1 },
      "-=0.5"
    );

    tl.to(backgroundImage, {
      opacity: 1,
      duration: 3,
      ease: "power1.inOut",
    });

    tl.to(
      urbanLetters,
      {
        textShadow: "1px 1px 20px black",
        color: "#00ff00",
        duration: 1,
        delay: 1.5,
        stagger: 0.1,
      },
      "-=2.5"
    );

    tl.to(
      chroniclesLetters,
      {
        textShadow: "1px 1px 20px black",
        color: "#ff00ff",
        duration: 1,
        delay: 1.5,
        stagger: 0.1,
      },
      "-=2.5"
    );
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
}

.loading-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#loading-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.urban-text,
.chronicles-text {
  font-size: 12vh;
  display: flex;
  gap: 0.2rem;
  margin: 0;
}

.urban-letter,
.chronicles-letter {
  opacity: 0;
  transform: translateY(20px);
  color: white;
  transition: opacity 1s, transform 1s, color 1s, text-shadow 0.5s;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/gent.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0;
  z-index: 0;
}

@media (prefers-reduced-motion: reduce) {
  .urban-text,
  .chronicles-text {
    animation: none;
  }
}
</style>
