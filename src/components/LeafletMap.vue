<template>
  <div id="map" :style="{ height: mapHeight + 'px' }"></div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  const mapHeight = ref(window.innerHeight);
  const map = ref(null);

  const setMapHeight = () => {
    mapHeight.value = window.innerHeight;
  };
  
  onMounted(() => {
    setMapHeight();
    
    map.value = L.map('map').setView([51.505, -0.09], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map.value);

    window.addEventListener('resize', () => {
      setMapHeight();
      setTimeout(() => {
        map.value.invalidateSize();
      }, 100);
    });
    
  });

  onUnmounted(() => {
    if (map.value) {
      map.value.remove();
    }
    window.removeEventListener('resize', setMapHeight);
  });

  watchEffect(() => {
    if (map.value) {
      map.value.invalidateSize();
    }
  });
  
</script>

<style scoped>
  #map { 
    width: 100%; 
  }
</style>
