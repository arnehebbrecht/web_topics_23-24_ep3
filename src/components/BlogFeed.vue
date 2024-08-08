<template>
  <!-- Loading Animation -->
  <LoadingAnimation v-if="loading" />

  <!-- Main Content -->
  <div class="container" v-if="!loading">
    <h1 class="title">Blog Feed</h1>
    <div class="content-wrapper">
      <div class="RSS-Feed">
        <ul class="feed-list">
          <li v-for="item in feedItems" :key="item.link" class="feed-item">
            <h2 class="feed-description">{{ item.title }}</h2>
            <p class="feed-description">{{ item.description }}</p>
            <a :href="item.link" class="feed-link">{{ item.link }}</a>
          </li>
        </ul>
      </div>
      <div class="sidebar">
        <div class="buttons">
          <button @click="copyFeedUrl" class="button button-copy">
            Copy RSS Feed URL
          </button>
          <button @click="notifySubscription" class="button button-notify">
            How to Subscribe
          </button>
        </div>
        <div v-if="notificationVisible" class="notification">
          <p>To subscribe to this feed, paste the copied URL into your RSS reader.</p>
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

<style scoped>
/* Container style */
.container {
  margin-top: 100px; /* Adjust based on the height of your NavigationBar */
  width: 100vw; /* Full viewport width */
  min-height: 100vh; /* Minimum height of the viewport to ensure the container covers the screen */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: #000; /* Black background */
  color: #fff; /* White text */
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 100px; /* Add padding at the bottom to prevent content from being hidden under the footer */
}

/* Title style */
.title {
  font-size: 2.5em; /* Larger title for prominence */
  color: #1a73e8; /* Highlight color */
  margin-bottom: 20px;
}

/* Wrapper for feed and sidebar */
.content-wrapper {
  display: flex;
  width: 100%;
}

/* RSS Feed style */
.RSS-Feed {
  flex: 3; /* Takes up 3/4 of the space */
}

/* Feed list style */
.feed-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.feed-item {
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #444; /* Darker border for visibility on black background */
  border-radius: 8px;
  background-color: #1e1e1e; /* Slightly lighter black background for items */
}

.feed-title {
  font-size: 1.4em;
  color: #1a73e8; /* Highlight color */
  text-decoration: none;
}

.feed-title:hover {
  text-decoration: underline;
}

.feed-description {
  font-size: 1em;
  color: #bbb; /* Light grey text color for descriptions */
}

.feed-link {
  color: #2196f3;
}

/* Sidebar style */
.sidebar {
  flex: 1; /* Takes up 1/4 of the space */
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Ensure sidebar takes the full height of the content */
  min-height: 100%;
}

/* Buttons container */
.buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 10px; /* Space between buttons */
}

/* Button styles */
.button {
  margin-top: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 100%; /* Make buttons stretch to fill the container */
}

.button-copy {
  background-color: #4caf50; /* Green background for the copy button */
  color: white;
}

.button-copy:hover {
  background-color: #45a049; /* Darker green on hover */
}

.button-notify {
  background-color: #2196f3; /* Blue background for the notify button */
  color: white;
}

.button-notify:hover {
  background-color: #1976d2; /* Darker blue on hover */
}

/* Notification style */
.notification {
  overflow-wrap: break-word; /* Wrap long URLs */
  background-color: #333; /* Dark background for notification */
  border: 1px solid #444; /* Slightly lighter border */
  margin-right: 20px;
  border-radius: 8px;
  max-width: 500px; /* Set a max-width for better readability */
  text-align: center;
  color: #fff; /* White text for contrast */
}

/* Loading animation styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7); /* Slightly darker background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of all other content */
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 8px solid #1a73e8;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
