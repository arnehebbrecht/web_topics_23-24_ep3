<template>
  <div id="app">
    <LoadingAnimation v-if="isLoading" />
    <NavigationBar />
    <MainPage v-if="!isLoading" />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import LoadingAnimation from "@/components/LoadingAnimation.vue";
import MainPage from "@/components/MainPage.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
    LoadingAnimation,
    MainPage,
  },
  data() {
    return {
      isLoading: true, // Initially set to true to show the loading animation
    };
  },
  mounted() {
    this.startWorker();
  },
  methods: {
    startWorker() {
      // Create a new Worker instance
      const worker = new Worker(new URL("@/workers/loadingWorker.js", import.meta.url), {
        type: "module",
      });

      worker.onmessage = (event) => {
        if (event.data.done) {
          this.isLoading = false;
        }
      };

      worker.postMessage("start"); // Send an initial message if needed
    },
  },
};
</script>
