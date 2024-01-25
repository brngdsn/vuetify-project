<template>
  <v-container class="fill-height" fluid>
    <v-responsive class="align-center text-center fill-height">
      <v-autocomplete
        variant="solo-inverted"
        v-model="search"
        :items="autocompleteItems"
        label="Search by Name or ID"
        class="map-autocomplete"
        @input="filterData"
        :item-text="item => `${item.id}: ${item.name}`"
        item-value="id"
      ></v-autocomplete>
      <leaflet-map :map-data="filteredMapData"></leaflet-map>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, computed, ref } from 'vue';
  import LeafletMap from '@/components/LeafletMap.vue';
  import { useAppStore } from '@/store/app';
  
  const appStore = useAppStore();

  const search = ref('');
  const filteredMapData = ref([]);
  
  onMounted(async () => {
    await appStore.fetchData();
    filteredMapData.value = appStore.data;
  });

  const mapData = computed(() => appStore.data);

  const autocompleteItems = computed(() => {
    return mapData.value ? mapData.value.map(item => ({ name: item.name, id: item.id })) : [];
  });

  const filterData = () => {
    if (search.value) {
      filteredMapData.value = mapData.value.filter(item =>
        item.name.toLowerCase().includes(search.value.toLowerCase()) ||
        item.id.toString().includes(search.value)
      );
    } else {
      filteredMapData.value = mapData.value;
    }
  };
</script>

<style scoped>
  .v-container {
    padding: 0px;
  }
  .map-autocomplete {
    position: absolute;
    z-index: 1000;
    width: 300px;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
