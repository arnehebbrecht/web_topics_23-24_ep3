<template>
  <div class="blog">
    <h1>Mijn Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Wat ik geleerd heb over Vue.js",
          content: "Inhoud van de blogpost...",
        },
        {
          id: 2,
          title: "Mijn ervaringen met tutorials",
          content: "Inhoud van de blogpost...",
        },
      ],
    };
  },
};
</script>

<style scoped>
.blog {
  z-index: 1000;
  max-width: 600px;
  background-color: #333;
}
</style>
