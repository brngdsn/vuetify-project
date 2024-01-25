<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <leaflet-map></leaflet-map>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import LeafletMap from '@/components/LeafletMap.vue';
  import { useAppStore } from '@/store/app';
  const appStore = useAppStore();
  
  onMounted(async () => {
    await appStore.fetchData();
  });
</script>
