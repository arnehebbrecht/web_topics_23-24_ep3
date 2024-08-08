// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import MapView from '@/views/Map.vue';
import BlogPage from '@/views/BlogPage.vue'; 


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Map',
    name: 'Map', 
    component: MapView
  },
  {
    path: '/Blog',
    name: 'Blog',
    component: BlogPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
});
export default router;
