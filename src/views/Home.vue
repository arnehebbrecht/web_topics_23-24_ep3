<template>
  <div id="app">
    <NavigationBar />
    <LoadingAnimation /> 
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import LoadingAnimation from '@/components/LoadingAnimation.vue';

export default {
  name: 'App',
  components: {
    LoadingAnimation,
    NavigationBar
  }
}
</script>




