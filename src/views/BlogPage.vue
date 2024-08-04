<template>
  <div id="app">
    <NavigationBar />
    <BlogComponent /> 
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import BlogComponent from '@/components/BlogComponent.vue';

export default {
  name: 'App',
  components: {
    BlogComponent,
    NavigationBar
  }
}
</script>




