<template>
  <nav class="navbar" aria-label="Main navigation">
    <ul class="nav-list">
      <li class="nav-item">
        <a href="/" @click.prevent="navigateTo('/')">Home</a>
      </li>
      <li class="nav-item">
        <a href="/Map" @click.prevent="navigateTo('/map')">Map</a>
      </li>
      <li class="nav-item">
        <a href="/Blog" @click.prevent="navigateTo('/blog')">Blog</a>
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
