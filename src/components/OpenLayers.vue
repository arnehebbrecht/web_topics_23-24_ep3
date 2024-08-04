<template>
  <div>
    <!-- Map container -->
    <div ref="mapContainer" class="map-container"></div>
    <!-- Information box -->
    <div v-if="selectedCity" class="info-box">
      <h3>{{ selectedCity.name }}</h3>
      <p>{{ selectedCity.info }}</p>
    </div>
    <!-- Error box -->
    <div v-if="error" class="error-box">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
// Import necessary libraries and components
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';

const workerUrl = new URL('@/workers/cityWorker.js', import.meta.url);

export default {
  data() {
    return {
      map: null,
      cityLayer: null,
      selectedCity: null,
      worker: null,
      error: null, // Added for error handling
    };
  },
  mounted() {
    this.initializeMap();
    this.initializeWorker();
  },
  methods: {
    trackEvent(category, action, label = '', value = 0) {
      if (window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      } else {
        console.warn('Google Analytics is not initialized.');
      }
    },

    initializeWorker() {
      if (window.Worker) {
        this.worker = new Worker(workerUrl, { type: 'module' });

        this.worker.onmessage = (event) => {
          const data = event.data;
          if (data.error) {
            this.error = data.error;
            console.error(data.error);
            this.trackEvent('Map Interaction', 'Error', data.error);
            return;
          }
          this.processCities(data); // places data
        };

        this.worker.postMessage({
          username: 'hebbrechtarne', // Replace with your GeoNames username
        });
      } else {
        console.error('Web Workers are not supported in this browser.');
      }
    },

    processCities(cities) {
      const features = cities.map(city => new Feature({
        geometry: new Point(fromLonLat([city.lng, city.lat])),
        name: city.name,
        info: `${city.name}, ${city.adminName1}, ${city.countryName}`,
      }));

      const citySource = new VectorSource({
        features: features,
      });

      if (this.cityLayer) {
        this.map.removeLayer(this.cityLayer); // Remove existing layer if present
      }

      this.cityLayer = new VectorLayer({
        source: citySource,
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: 'https://openlayers.org/en/latest/examples/data/icon.png', // Built-in example icon URL
            scale: 1, // Scale down the icon size
          }),
        }),
      });

      this.map.addLayer(this.cityLayer);

      const select = new Select({
        condition: click,
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: 'https://openlayers.org/en/latest/examples/data/icon.png', // Same icon for selected state
            scale: 1, // Scale down the icon size
          }),
        }),
      });

      this.map.addInteraction(select);

      select.on('select', (e) => {
        if (e.selected.length > 0) {
          const feature = e.selected[0];
          this.selectedCity = {
            name: feature.get('name'),
            info: feature.get('wikipedia'),
          };
          this.trackEvent('Map Interaction', 'Select City', feature.get('name'));
        } else {
          this.selectedCity = null;
        }
      });

      // Track when cities are processed
      this.trackEvent('Map Interaction', 'Process Cities', '', cities.length);
    },

    initializeMap() {
      this.map = new Map({
        target: this.$refs.mapContainer,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([4.5, 50.5]),
          zoom: 7,
        }),
      });

      // Track map initialization
      this.trackEvent('Map Interaction', 'Initialize Map');
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100vw;
  height: 80vh; /* Full viewport height */
}

.info-box {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

.error-box {
  position: absolute;
  bottom: 100px;
  left: 20px;
  background: #f8d7da;
  color: #721c24;
  padding: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}
</style>
