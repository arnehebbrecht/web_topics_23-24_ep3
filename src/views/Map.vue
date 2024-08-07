<!-- src/views/Map.vue -->
<template>
  <div>
    <NavigationBar />
    <OpenLayers />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import OpenLayers from "@/components/OpenLayers.vue";

export default {
  name: "MapView", // Updated name to reflect the component’s purpose
  components: {
    NavigationBar,
    OpenLayers,
  },
};
</script>
