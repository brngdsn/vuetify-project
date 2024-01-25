<template>
  <v-container class="fill-height" fluid>
    <v-responsive class="align-center text-center fill-height">
      <v-autocomplete
        variant="solo-inverted"
        v-model="search"
        :items="autocompleteItems"
        label="Search by Name or ID"
        class="map-autocomplete"
        :item-title="item => item ? `${item.id}: ${item.name}` : ''"
        item-value="id"
      ></v-autocomplete>
      <leaflet-map :map-data="filteredMapData"></leaflet-map>
      <v-bottom-sheet v-model="sheet" inset>
        <v-card
          class="text-center"
          height="200"
        >
          <v-card-text>
            <v-btn
              variant="text"
              @click="sheet = !sheet"
            >
              close
            </v-btn>
  
            <br>
            <br>
  
            <div>
              This is a bottom sheet that is using the inset prop
            </div>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
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
  const sheet = ref(false);

  const mapData = computed(() => appStore.data);

  const autocompleteItems = computed(() => {
    return mapData.value ? mapData.value.map(item => ({ name: item.name, id: item.id })) : [];
  });

  watch(search, (newValue) => {
    if (!newValue) {
      filteredMapData.value = mapData.value;
    } else {
      filteredMapData.value = mapData.value.filter(item => item.id === newValue);
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
