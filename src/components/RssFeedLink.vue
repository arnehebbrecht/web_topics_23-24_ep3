<template>
  <div>
    <!-- Optional: Add a visible element or button if needed -->
    <!-- You might add an informative message or status indicator here if relevant -->
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

    // Optionally, add error handling for the feed URL
    // Here you might implement additional logic if the RSS feed fails to load
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
