<template>
  <div class="loading-container">
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
    <div ref="backgroundImage" class="background-image"></div>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'LoadingAnimation',
  mounted() {
    const urbanText = this.$refs.urbanText;
    const urbanLetters = urbanText.querySelectorAll('.urban-letter');
    const chroniclesText = this.$refs.chroniclesText;
    const chroniclesLetters = chroniclesText.querySelectorAll('.chronicles-letter');
    const backgroundImage = this.$refs.backgroundImage;

    const tl = gsap.timeline();

    // Animate urban text letters one by one
    tl.fromTo(urbanLetters, 
      { opacity: 0, y: 20, color: 'white' }, 
      { opacity: 1, y: 0, color: 'white', stagger: 0.1, duration: 1 }
    );

    // Animate chronicles text letters one by one
    tl.fromTo(chroniclesLetters, 
      { opacity: 0, y: 20, color: 'white' }, 
      { opacity: 1, y: 0, color: 'white', stagger: 0.1, duration: 1 },
      "-=0.5" // Start this animation halfway through the previous one
    );

    // Fade in the background image
    tl.to(backgroundImage, {
      opacity: 1,
      duration: 3,
      ease: 'power1.inOut',
    });

    // Fade text to black after a delay
    tl.to(urbanLetters, {
      textShadow: '1px 1px 20px black', // Black outline effect
      color: "#00ff00",
      duration: 1,
      delay: 1.5, // Delay before starting the color change
      stagger: 0.1 // Maintain stagger effect for smooth transition
    }, "-=2.5"); // Adjust to overlap with the end of the background image fade

    tl.to(chroniclesLetters, {
      textShadow: '1px 1px 20px black', // Black outline effect
      color: "#ff00ff",
      duration: 1,
      delay: 1.5, // Delay before starting the color change
      stagger: 0.1 // Maintain stagger effect for smooth transition
    }, "-=2.5"); // Adjust to overlap with the end of the background image fade
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
  background-color: #000; /* Set background color to black */
  font-family: Arial, sans-serif;
  overflow: hidden;
}

.loading-container {
  position: relative;
  width: 100vw;
  height: 100vh; /* Ensure full viewport height */
  display: flex;
  justify-content: center;
  align-items: center; /* Center content vertically */
  overflow: hidden; /* Ensure no overflow */
}

#loading-content {
  display: flex;
  flex-direction: column; /* Stack text vertically */
  justify-content: center; /* Center vertically in the container */
  align-items: center; /* Center horizontally in the container */
  z-index: 1; /* Ensure content is above the image */
}

.urban-text,
.chronicles-text {
  font-size: 12vh; /* Use viewport width for responsive text size */
  display: flex; /* Align items horizontally */
  gap: 0.2rem;
  margin: 0;
}

.urban-letter,
.chronicles-letter {
  opacity: 0;
  transform: translateY(20px);
  color: white; /* Initial text color */
  transition: opacity 1s, transform 1s, color 1s, text-shadow 0.5s;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/gent.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0;
  z-index: 0;
}
</style>
