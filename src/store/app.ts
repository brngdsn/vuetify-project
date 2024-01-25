// Utilities
import { defineStore } from 'pinia';
import axios from 'axios';
import { Meteorite } from '@/types/types.ts';

interface State {
  data: Meteorite[] | null;
  loading: boolean;
  error: Error | null;
  favourites: Set<string>;
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    data: null,
    loading: false,
    error: null,
    favourites: new Set(JSON.parse(localStorage.getItem('favourites') || '[]')),
  }),
  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://data.nasa.gov/resource/y77d-th95.json');
        this.data = response.data as Meteorite[];
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    toggleFavourite(id: string) {
      if (this.favourites.has(id)) {
        this.favourites.delete(id);
      } else {
        this.favourites.add(id);
      }
      localStorage.setItem('favourites', JSON.stringify([...this.favourites])); // Persist to local storage
    },
    isFavourite(id: string) {
      return this.favourites.has(id);
    }
  },
})
