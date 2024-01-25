<template>
  <div id="map" :style="{ height: mapHeight + 'px' }"></div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  const props = defineProps({
    mapData: Array
  });
  
  const mapHeight = ref(window.innerHeight);
  const map = ref(null);

  const setMapHeight = () => {
    mapHeight.value = window.innerHeight;
  };

  const addMarkers = (data) => {
    console.log('addMarkers')
    data.forEach(item => {
      if (item.geolocation && item.geolocation.coordinates) {
        L.marker([item.geolocation.coordinates[1], item.geolocation.coordinates[0]])
          .bindPopup(`<b>${item.name}</b><br>Mass: ${item.mass}<br>Year: ${item.year}`)
          .addTo(map.value);
      }
    });
  };
  
  onMounted(() => {
    setMapHeight();
    
    map.value = L.map('map').setView([51.505, -0.09], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map.value);

    window.addEventListener('resize', () => {
      setMapHeight();
      setTimeout(() => {
        map.value.invalidateSize();
      }, 100);
    });

    if (props.mapData) {
      addMarkers(props.mapData);
    }
    
  });

  watch(() => props.mapData, (newValue) => {
    console.log('watch.map')
    if (newValue) {
      console.log('add new markers')
      addMarkers(newValue);
    }
  }, { immediate: true });

  onUnmounted(() => {
    if (map.value) {
      map.value.remove();
    }
    window.removeEventListener('resize', setMapHeight);
  });
  
</script>

<style scoped>
  #map { 
    width: 100%; 
  }
</style>
