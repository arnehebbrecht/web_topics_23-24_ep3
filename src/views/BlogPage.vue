<template>
  <div id="app">
    <NavigationBar />
    <RssFeedLink />
    <BlogFeed />
    <FooterComponent />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import RssFeedLink from "@/components/RssFeedLink.vue";
import BlogFeed from "@/components/BlogFeed.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    RssFeedLink,
    NavigationBar,
    BlogFeed,
    FooterComponent,
  },
};
</script>
