<template>
  <v-container class="fill-height" fluid>
    <v-responsive class="align-center text-center fill-height">
      <leaflet-map :map-data="mapData"></leaflet-map>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, computed } from 'vue';
  import LeafletMap from '@/components/LeafletMap.vue';
  import { useAppStore } from '@/store/app';
  const appStore = useAppStore();
  
  onMounted(async () => {
    await appStore.fetchData();
  });

  const mapData = computed(() => appStore.data);
</script>

<style scoped>
  .v-container {
    padding: 0px;
  }
</style>
