// Utilities
import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
  data: any;
  loading: boolean;
  error: Error | null;
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    data: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://data.nasa.gov/resource/y77d-th95.json');
        this.data = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  },
})
