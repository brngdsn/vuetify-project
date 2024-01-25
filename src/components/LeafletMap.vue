<template>
  <div id="map" style="height: 400px;"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default defineComponent({
  name: 'LeafletMap',
  setup() {
    onMounted(() => {
      const map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
    });
  }
});
</script>

<style>
#map { 
  width: 100%; 
  height: 100%;
}
</style>
