// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import home from '@/views/Home.vue';
import MapView from '@/views/Map.vue';
import BlogPage from '@/views/BlogPage.vue'; 


const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/map',
    name: 'map', 
    component: MapView
  },
  {
    path: '/blog',
    name: 'blog',
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
