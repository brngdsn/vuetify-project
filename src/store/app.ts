// Utilities
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppStore = defineStore('app', {
  state: () => ({
    data: null,
    loading: false,
    error: null,
  }),
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
})
