<template>
  <v-container class="fill-height" fluid>
    <v-responsive class="align-center text-center fill-height">
      <v-autocomplete
        variant="solo-inverted"
        v-model="search"
        :items="autocompleteItems"
        label="Search by Name or ID"
        class="map-autocomplete"
        @change="filterData"
        :item-title="item => item ? `${item.id}: ${item.name}` : ''"
        item-value="id"
        return-object
      ></v-autocomplete>
      <leaflet-map :map-data="filteredMapData"></leaflet-map>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, computed, watch, ref } from 'vue';
  import LeafletMap from '@/components/LeafletMap.vue';
  import { useAppStore } from '@/store/app';
  
  const appStore = useAppStore();

  const search = ref('');
  const filteredMapData = ref([]);

  const mapData = computed(() => appStore.data);

  const autocompleteItems = computed(() => {
    console.log('autocompleteItems')
    return mapData.value ? mapData.value.map(item => ({ name: item.name, id: item.id })) : [];
  });

  const filterData = (selectedItem) => {
    console.log('filterData', { selectedItem })
    if (selectedItem) {
      console.log('selectedItem')
      filteredMapData.value = [mapData.value.find(item => item.id === selectedItem.id)];
    } else {
      filteredMapData.value = mapData.value;
    }
  };

  watch(search, (newValue) => {
    console.log('watch.search', { newValue })
    if (!newValue) {
      filteredMapData.value = mapData.value;
    }
  });

  onMounted(async () => {
    await appStore.fetchData();
    filteredMapData.value = appStore.data;
  });
</script>

<style scoped>
  .v-container {
    padding: 0px;
  }
  .map-autocomplete {
    position: absolute;
    z-index: 1000;
    width: 80%;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
