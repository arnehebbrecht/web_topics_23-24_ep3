// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import MapView from '@/views/Map.vue';
// import Contact from '@/views/Contact.vue'; // Uncomment if needed

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Map', // Lowercase path
    name: 'Map', // Ensure this matches your route names
    component: MapView
  }
  // Uncomment if needed
  // {
  //   path: '/contact',
  //   name: 'Contact',
  //   component: Contact
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
