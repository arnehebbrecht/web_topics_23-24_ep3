<template>
  <div class="loading-container" role="presentation">
    <!-- Skip Link -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Main Content with ARIA Live Region -->
    <div id="loading-content" aria-live="polite" aria-atomic="true">
      <!-- Urban Text -->
      <div ref="urbanText" class="urban-text" role="heading" aria-level="1">
        <span class="urban-letter" aria-hidden="true">U</span>
        <span class="urban-letter" aria-hidden="true">r</span>
        <span class="urban-letter" aria-hidden="true">b</span>
        <span class="urban-letter" aria-hidden="true">a</span>
        <span class="urban-letter" aria-hidden="true">n</span>
      </div>

      <!-- Chronicles Text -->
      <div ref="chroniclesText" class="chronicles-text" role="heading" aria-level="2">
        <span class="chronicles-letter" aria-hidden="true">C</span>
        <span class="chronicles-letter" aria-hidden="true">h</span>
        <span class="chronicles-letter" aria-hidden="true">r</span>
        <span class="chronicles-letter" aria-hidden="true">o</span>
        <span class="chronicles-letter" aria-hidden="true">n</span>
        <span class="chronicles-letter" aria-hidden="true">i</span>
        <span class="chronicles-letter" aria-hidden="true">c</span>
        <span class="chronicles-letter" aria-hidden="true">l</span>
        <span class="chronicles-letter" aria-hidden="true">e</span>
        <span class="chronicles-letter" aria-hidden="true">s</span>
      </div>
    </div>

    <!-- Decorative Background Image -->
    <div
      ref="backgroundImage"
      class="background-image"
      role="img"
      aria-label="Decorative background image"
    ></div>

    <!-- Main Content Section -->
    <div id="main-content" tabindex="-1">
      <!-- Content that follows the loading screen would go here -->
    </div>
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
/* General Styles */
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

/* Skip Link Styles */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
  border: 2px solid transparent;
  border-radius: 4px;
  font-size: 16px;
}

.skip-link:focus {
  top: 0;
  background: #fff;
  color: #000;
  border-color: #000;
  outline: none;
  /* Ensure visibility of skip link when focused */
}

/* Loading Container */
.loading-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Main Content Area */
#loading-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

/* Text Styles */
.urban-text,
.chronicles-text {
  font-size: 12vh;
  display: flex;
  gap: 0.2rem;
  margin: 0;
}

/* Letter Styles */
.urban-letter,
.chronicles-letter {
  opacity: 0;
  transform: translateY(20px);
  color: #ffffff; /* Ensure sufficient contrast */
  transition: opacity 1s, transform 1s, color 1s, text-shadow 0.5s;
}

/* Background Image */
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

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .urban-text,
  .chronicles-text {
    transition: opacity 0s, transform 0s, color 0s, text-shadow 0s; /* Remove animation */
  }
}

/* Focus Styles for Accessibility */
:focus {
  outline: 3px solid #ffcc00; /* Ensure focus visibility */
}

/* Main Content Section */
#main-content {
  padding: 20px;
}
</style>
