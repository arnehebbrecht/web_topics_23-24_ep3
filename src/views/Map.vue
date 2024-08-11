<!-- src/views/Map.vue -->
<template>
  <div>
    <NavigationBar />
    <OpenLayers />
    <FooterComponenten />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import OpenLayers from "@/components/OpenLayers.vue";
import FooterComponenten from "@/components/FooterComponent.vue";

export default {
  name: "MapView", // Updated name to reflect the component’s purpose
  components: {
    NavigationBar,
    OpenLayers,
    FooterComponenten,
  },
};
</script>
