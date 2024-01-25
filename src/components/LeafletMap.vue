<template>
  <div id="map" :style="{ height: mapHeight + 'px' }"></div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { Meteorite } from '@/types/types';

  const props = defineProps({
    mapData: Array as () => Meteorite[]
  });
  
  const mapHeight = ref(window.innerHeight);
  const map = ref<L.Map | null>(null);
  const markerGroup = ref<L.LayerGroup | null>(null);

  const setMapHeight = () => {
    mapHeight.value = window.innerHeight;
  };

  const addMarkers = (data: Meteorite[]) => {
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
        if (markerGroup.value) {
          markerGroup.value.addLayer(marker);
        }
        if (index === 0 && map.value instanceof L.Map) {
          const firstItemCoords = item.geolocation.coordinates;
          const zoom: number = data.length === 1 ? 9 : 7;
          (map.value as L.Map).setView([firstItemCoords[1], firstItemCoords[0]], zoom);
        }
      }
    });
    if (markerGroup.value && map.value instanceof L.Map) {
      markerGroup.value.addTo(map.value as L.Map);
    }
  };

  watch(() => props.mapData || [], (newValue: Meteorite[] | undefined) => {
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
    
    map.value = L.map('map').setView([51.505, -0.09], 7);
    
    if (map.value && map.value instanceof L.Map) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map.value as L.Map);
    }

    window.addEventListener('resize', () => {
      setMapHeight();
      setTimeout(() => {
        if (map.value) {
          map.value.invalidateSize();
        }
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
