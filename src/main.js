import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import the plugins
import VueGtm from '@gtm-support/vue-gtm';
import VueGtag from 'vue-gtag';
import './assets/styles.css';
// Create the Vue application
const app = createApp(App);

// Configure and use Google Tag Manager
app.use(VueGtm, {
  id: 'GTM-M85V9HMH', // Replace with your Google Tag Manager ID
  vueRouter: router
});

// Configure and use Google Analytics 4
app.use(VueGtag, {
  property: {
    id: 'G-QYPTTM8R73' // Replace with your GA4 Measurement ID
  }
}, router);

// Use the router and mount the app
app.use(router).mount('#app');
