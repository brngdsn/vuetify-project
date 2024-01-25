<template>
  <div id="map" style="height: 400px;"></div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  const map = ref(null);
  
  onMounted(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);
  
    map.value = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map.value);

    window.addEventListener('resize', () => {
      setTimeout(() => {
        map.value.invalidateSize();
      }, 100);
    });
    
  });

  onUnmounted(() => {
    if (map.value) {
      map.value.remove();
    }
  });
  
</script>

<style scoped>
#map { 
  width: 100%; 
  height: 100%;
}
</style>
