<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li class="nav-item">
        <a href="#" @click.prevent="navigateTo('/')">Home</a>
      </li>
      <li class="nav-item">
        <a href="#" @click.prevent="navigateTo('/Map')">Map</a>
      </li>
      <li class="nav-item">
        <a href="#" @click.prevent="navigateTo('/Blog')">Blog</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "NavigationBar",
  setup() {
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path);
    };

    return {
      navigateTo,
    };
  },
};
</script>
<style scoped>
.navbar {
  position: fixed; /* Fix the navbar to the top of the page */
  top: 0;
  width: 100%;
  background-color: #333; /* Example background color */
  color: white;
  padding: 1rem;
  z-index: 9999; /* Ensure it's above other content */
  left: 0;
}

.nav-list {
  list-style-type: none; /* Remove default list styling */
  display: flex; /* Use flexbox to align items horizontally */
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-right: 1rem; /* Space between each nav item */
}

.nav-item a {
  color: white;
  text-decoration: none;
}

.nav-item a:hover {
  text-decoration: underline; /* Add underline on hover */
  color: lightgray; /* Change color on hover */
}
</style>
