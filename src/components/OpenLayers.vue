<template>
  <div class="full-container">
    <!-- Loading Animation -->
    <LoadingAnimation v-if="loading" />
    <!-- Toggle Button for Sidebar -->
    <button class="toggle-button" @click="toggleSidebar">
      {{ isSidebarVisible ? "All Wikipedia Links" : "Close" }}
    </button>

    <!-- Map container -->
    <div ref="mapContainer" class="map-container"></div>

    <!-- Sidebar -->
    <div v-if="!isSidebarVisible" class="sidebar">
      <ul>
        <li v-for="city in cities" :key="city.name">
          <a
            :href="formatWikipediaUrl(city.wikipedia)"
            target="_blank"
            rel="noopener noreferrer"
            @click="trackSidebarLinkClick(city.wikipedia)"
          >
            {{ city.name }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Information box -->
    <div
      v-if="selectedCity"
      class="info-box"
      :style="{ top: infoBoxPosition.top + 'px', left: infoBoxPosition.left + 'px' }"
    >
      <h3>{{ selectedCity.name }}</h3>
      <p>
        <a
          :href="selectedCity.wikipedia"
          target="_blank"
          rel="noopener noreferrer"
          @click="trackSidebarLinkClick(selectedCity.wikipedia)"
        >
          Wikipedia Link
        </a>
      </p>
    </div>

    <!-- Error box -->
    <div v-if="error" class="error-box">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import LoadingAnimation from "./LoadingAnimation.vue";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import { fromLonLat, toLonLat } from "ol/proj";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";

const workerUrl = new URL("@/workers/cityWorker.js", import.meta.url);

export default {
  components: {
    LoadingAnimation,
  },
  data() {
    return {
      map: null,
      cityLayer: null,
      selectedCity: null,
      infoBoxPosition: { top: 0, left: 0 },
      worker: null,
      error: null,
      isSidebarVisible: true,
      cities: [],
      loading: true,
      isMapIdle: true,
      mapIdleTimeout: null,
      zoomChangeTimeout: null,
      isZooming: false,
    };
  },
  mounted() {
    this.initializeMap();
    this.initializeWorker();
  },
  beforeUnmount() {
    if (this.worker) {
      this.worker.terminate();
    }
  },
  methods: {
    formatWikipediaUrl(url) {
      if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`;
      }
      return url;
    },

    trackEvent(category, action, label = "") {
      if (this.$gtag) {
        this.$gtag.event(action, {
          event_category: category,
          event_label: label,
        });
      } else {
        console.warn("Google Analytics not available. Event not tracked.");
      }
    },

    trackSidebarLinkClick(wikipediaUrl) {
      this.trackEvent("Sidebar Interaction", "Click Link", `${wikipediaUrl}`);
    },

    initializeWorker() {
      if (window.Worker) {
        this.worker = new Worker(workerUrl, { type: "module" });

        this.worker.onmessage = (event) => {
          const data = event.data;
          if (data.error) {
            this.error = data.error;
            console.error(data.error);
            this.trackEvent("Worker Interaction", "Error", data.error);
            return;
          }
          this.processCities(data);
          this.loading = false;
        };

        this.worker.postMessage({ username: "hebbrechtarne" });
      } else {
        console.error("Web Workers are not supported in this browser.");
      }
    },

    processCities(cities) {
      this.cities = cities;

      const features = cities.map((city) => {
        let wikipediaUrl = city.wikipedia;
        if (wikipediaUrl && !wikipediaUrl.startsWith("http")) {
          wikipediaUrl = `https://${wikipediaUrl}`;
        }

        return new Feature({
          geometry: new Point(fromLonLat([city.lng, city.lat])),
          name: city.name,
          wikipedia: wikipediaUrl,
          info: `${city.name}, ${city.adminName1}, ${city.countryName}`,
        });
      });

      const citySource = new VectorSource({ features: features });

      if (this.cityLayer) {
        this.map.removeLayer(this.cityLayer);
      }

      this.cityLayer = new VectorLayer({
        source: citySource,
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            scale: 1,
          }),
        }),
      });

      this.map.addLayer(this.cityLayer);

      const select = new Select({
        condition: click,
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            scale: 1,
          }),
        }),
      });

      this.map.addInteraction(select);

      select.on("select", (e) => {
        if (e.selected.length > 0) {
          const feature = e.selected[0];
          this.selectedCity = {
            name: feature.get("name"),
            wikipedia: feature.get("wikipedia"),
            info: feature.get("info"),
          };
          this.updateInfoBoxPosition(e.mapBrowserEvent.pixel);
          this.trackEvent("Map Interaction", "Select City", feature.get("name"));
        } else {
          this.selectedCity = null;
        }
      });
    },

    initializeMap() {
      this.map = new Map({
        target: this.$refs.mapContainer,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([4.5, 50.5]),
          zoom: 7,
        }),
      });

      const view = this.map.getView();

      view.on("change:center", this.debounceOrThrottleMapMove);
      view.on("change:resolution", this.debounceOrThrottleZoomChange);
    },

    debounceOrThrottleMapMove() {
      if (this.isZooming) return;

      if (this.mapIdleTimeout) {
        clearTimeout(this.mapIdleTimeout);
      }
      this.mapIdleTimeout = setTimeout(() => {
        this.isMapIdle = true;
        this.handleMapMove();
      }, 300);
    },

    debounceOrThrottleZoomChange() {
      if (this.zoomChangeTimeout) {
        clearTimeout(this.zoomChangeTimeout);
      }
      this.zoomChangeTimeout = setTimeout(() => {
        this.handleZoomChange();
      }, 300);
    },

    handleMapMove() {
      if (this.isMapIdle) {
        const center = this.map.getView().getCenter();
        const [longitude, latitude] = toLonLat(center);
        this.trackEvent(
          "Map Interaction",
          "Map Moved",
          `Longitude: ${longitude.toFixed(6)}, Latitude: ${latitude.toFixed(6)}`
        );
        this.isMapIdle = false;
      }
    },

    handleZoomChange() {
      if (!this.isZooming) {
        this.isZooming = true;
        const zoom = this.map.getView().getZoom();
        this.trackEvent("Map Interaction", "Zoom Changed", `Zoom Level: ${zoom}`);
        this.isZooming = false;
      }
    },

    updateInfoBoxPosition(pixel) {
      const mapElement = this.$refs.mapContainer;
      const mapRect = mapElement.getBoundingClientRect();
      this.infoBoxPosition = {
        top: pixel[1] + mapRect.top,
        left: pixel[0] + mapRect.left + 10,
      };

      if (this.selectedCity) {
        this.trackEvent("Info Box", "Display", this.selectedCity.name);
      }
    },

    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
  },
};
</script>

<style scoped>
.full-container {
  position: relative;
}

.map-container {
  padding-top: 100px;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.sidebar {
  position: absolute;
  top: 100px;
  right: 0;
  width: 200px;
  height: 100%;
  background: #333;
  border-left: 1px solid #ddd;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  z-index: 1000;
}

.sidebar ul li::marker {
  color: #00ff00;
}
.sidebar ul li a {
  color: white;
}

.info-box {
  position: absolute;
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.toggle-button {
  position: absolute;
  top: 100px;
  right: 0;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1001;
}

.toggle-button:hover {
  background: #0056b3;
}

.sidebar .close-button {
  background: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  padding: 5px 10px;
  z-index: 1001;
}

.sidebar .close-button:hover {
  background: #cc0000;
}
</style>
