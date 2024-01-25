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
    if (map.value) {
      map.value.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.value.removeLayer(layer);
        }
      });
    }
    data.forEach(item => {
      if (item.geolocation && item.geolocation.coordinates) {
        L.marker([item.geolocation.coordinates[1], item.geolocation.coordinates[0]])
          .bindPopup(`<b>${item.name}</b><br>Mass: ${item.mass}<br>Year: ${item.year}`)
          .addTo(map.value);
      }
    });
    const [{
      geolocation: {
        coordinates: [lon, lat]
      }
    }] = data;
    console.log(lat, lon);
    map.value = L.map('map').setView([lat, lon], 5);
  };

  watch(() => props.mapData, (newValue) => {
    if (newValue) {
      addMarkers(newValue);
    }
  }, { immediate: true });
  
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
