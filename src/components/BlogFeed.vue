<template>
  <!-- Loading Animation -->
  <LoadingAnimation v-if="loading" />

  <!-- Main Content -->
  <div class="container" v-if="!loading">
    <h1 class="title">What I Have Learned ?</h1>
    <div class="content-wrapper">
      <div class="RSS-Feed" aria-labelledby="feed-section">
        <h2 id="feed-section" class="visually-hidden">RSS Feed</h2>
        <ul class="feed-list" aria-live="polite">
          <li v-for="item in feedItems" :key="item.link" class="feed-item">
            <h3 class="feed-title">{{ item.title }}</h3>
            <p class="feed-description">{{ item.description }}</p>
            <a
              :href="item.link"
              class="feed-link"
              target="_blank"
              rel="noopener noreferrer"
              >{{ item.link }}</a
            >
          </li>
        </ul>
      </div>
      <div class="sidebarblog">
        <div class="buttons">
          <button
            @click="copyFeedUrl"
            class="button button-copy"
            aria-label="Copy RSS Feed URL"
          >
            Copy RSS Feed URL
          </button>
          <button
            @click="notifySubscription"
            class="button button-notify"
            aria-label="How to Subscribe"
          >
            How to Subscribe
          </button>
          <div v-if="notificationVisible" class="notification" role="alert">
            <p>To subscribe to this feed, paste the copied URL into your RSS reader.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingAnimation from "./LoadingAnimation.vue";

export default {
  components: {
    LoadingAnimation,
  },
  data() {
    return {
      feedItems: [],
      notificationVisible: false,
      feedUrl: "", // To store the RSS feed URL
      loading: true, // Track loading state
    };
  },
  async mounted() {
    const linkElement = document.querySelector(
      'link[rel="alternate"][type="application/rss+xml"]'
    );
    if (linkElement) {
      this.feedUrl = linkElement.href;
    } else {
      console.error("RSS feed <link> element not found.");
    }

    try {
      const response = await fetch(this.feedUrl);
      const text = await response.text();

      // Create a new DOMParser instance
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "application/xml");
      const items = Array.from(xmlDoc.querySelectorAll("item"));

      // Map XML items to a more usable format
      this.feedItems = items.map((item) => ({
        title: item.querySelector("title").textContent,
        link: item.querySelector("link").textContent,
        description: item.querySelector("description").textContent,
      }));
    } catch (error) {
      console.error("Error fetching or parsing RSS feed:", error);
    } finally {
      this.loading = false; // Hide loading animation after data is fetched
    }
  },
  methods: {
    copyFeedUrl() {
      if (this.feedUrl) {
        navigator.clipboard
          .writeText(this.feedUrl)
          .then(() => {
            alert("RSS feed URL copied to clipboard. Paste it into your RSS reader.");
          })
          .catch((err) => {
            console.error("Failed to copy RSS feed URL: ", err);
          });
      } else {
        console.error("Feed URL is not set.");
      }
    },
    notifySubscription() {
      this.notificationVisible = true;
      setTimeout(() => {
        this.notificationVisible = false;
      }, 5000); // Hide the notification after 5 seconds
    },
  },
};
</script>
