<template>
  <v-container class="fill-height" fluid>
    <v-responsive class="align-center fill-height">
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
      <v-card
        class="map-card"
        :title="cardTitle"
        subtitle="NASA's Open Data Portal"
        :text="cardText"
      >
        <v-card-actions>
          <v-btn v-if="showAction" @click="addToFavourites">{{ isFavourite ? 'Remove from' : 'Add to' }} Favourites</v-btn>
        </v-card-actions>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, computed, watch, ref } from 'vue';
  import { Meteorite } from '@/types/types.ts';
  import LeafletMap from '@/components/LeafletMap.vue';
  import { useAppStore } from '@/store/app';
  
  const appStore = useAppStore();

  const search = ref<string>('');
  const filteredMapData = ref<Meteorite[]>([]);

  const mapData = computed((): Meteorite[] => appStore.data);
  
  const showAction = computed((): boolean => filteredMapData.value.length === 1);

  const cardTitle = computed((): string => {
    if (filteredMapData.value.length === 1) {
      return `${filteredMapData.value[0].name}`;
    } else {
      return `${filteredMapData.value.length} Meteorite Landing(s)`
    }
  });
  
  const cardText = computed((): string => {
    if (filteredMapData.value.length === 1) {
      const item = filteredMapData.value[0];
      const year = new Date(item.year).getFullYear();
      const hasLocation = item.geolocation ? true : false;
      return `The "${item.name}" class ${item.recclass} meteorite, with a mass of ${item.mass} grams, ${item.fell === 'Found' ? 'was found' : 'had fell'} in the year ${year}. ${!hasLocation ? 'This meteorite has no geolcation data.' : ''}`;
    } else {
      return `This comprehensive data set from The Meteoritical Society contains information on all of the known meteorite landings. Some meteorites without a geolocation may not render.`;
    }
  });

  const autocompleteItems = computed((): { name: string; id: string }[] => {
    return mapData.value ? mapData.value.map(item => ({ name: item.name, id: item.id })) : [];
  });

  const addToFavourites = () => {
    if (filteredMapData.value.length === 1) {
      appStore.toggleFavourite(filteredMapData.value[0].id);
    }
  };

  const isFavourite = computed((): boolean => {
    return filteredMapData.value.length === 1 && appStore.isFavourite(filteredMapData.value[0].id);
  });

  watch(search, (newValue: string) => {
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
    width: 75%;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  .map-card {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: 90%;
  }
</style>
