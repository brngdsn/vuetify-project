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
  const markerGroup = ref<L.LayerGroup | null>(null);

  const setMapHeight = () => {
    mapHeight.value = window.innerHeight;
  };

  const addMarkers = (data) => {
    markerGroup.value = L.layerGroup();
    data.forEach((item, index) => {
      if (item.geolocation && item.geolocation.coordinates) {
        const year = new Date(item.year).getFullYear();
        const marker = L.marker([item.geolocation.coordinates[1], item.geolocation.coordinates[0]])
          .bindPopup(`
            <b>${item.name}</b><br>
            Mass: ${item.mass} (${item.recclass})<br>
            Year: ${year}<br>
            Fell: ${item.fall}
          `);
        markerGroup.value.addLayer(marker);
        if (index === 0) {
          const firstItemCoords = item.geolocation.coordinates;
          const zoom = data.length === 1 ? 9 : 5
          map.value.setView([firstItemCoords[1], firstItemCoords[0]], zoom);
        }
      }
    });
    markerGroup.value.addTo(map.value);
  };

  watch(() => props.mapData, (newValue) => {
    if (newValue && newValue.length > 0) {
      if (!markerGroup.value) {
        markerGroup.value = L.layerGroup();
      } else {
        markerGroup.value.remove();
      }
      addMarkers(newValue);
    }
  }, { immediate: true });
  
  onMounted(() => {
    setMapHeight();
    
    map.value = L.map('map').setView([51.505, -0.09], 9);
    
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
