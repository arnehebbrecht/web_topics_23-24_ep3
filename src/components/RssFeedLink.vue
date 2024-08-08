<template>
  <div>
    <!-- Optional: Add a visible element or button -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedUrl: "", // To be set dynamically
    };
  },
  mounted() {
    // Construct the full URL for the RSS feed
    const baseUrl = window.location.origin;
    this.feedUrl = `${baseUrl}/rss-feed.xml`; // Construct the full URL

    // Create a link element for the RSS feed
    const link = document.createElement("link");
    link.rel = "alternate";
    link.type = "application/rss+xml";
    link.title = "RSS Feed";
    link.href = this.feedUrl;

    // Append the link element to the <head>
    document.head.appendChild(link);
  },
  beforeUnmount() {
    // Clean up the link element when the component is destroyed
    const link = document.querySelector(
      'link[rel="alternate"][type="application/rss+xml"]'
    );
    if (link) {
      document.head.removeChild(link);
    }
  },
};
</script>
