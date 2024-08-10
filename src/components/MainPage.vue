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
