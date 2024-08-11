<template>
  <footer>
    <nav>
      <ul>
        <li>
          <a href="/accesibility.belgium.html"
            >toegankelijkheidsverklaring accesibility belgium</a
          >
        </li>
        <li>
          <a href="/urban-chronicles-report.html"
            >Web Content Accessibility Guidelines Evaluation Methodology</a
          >
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
footer {
  margin-bottom: 20vh;
  background-color: #333;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 10px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-size: larger;
  color: white;
  padding-left: 12vw;
}
</style>
