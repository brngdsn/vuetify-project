// src/types/types.ts

export interface Meteorite {
  name: string;
  id: string;
  nametype: string;
  recclass: string;
  mass: string;
  fall: string;
  year: string;
  reclat: string;
  reclong: string;
  geolocation?: {
    type: string;
    coordinates: [number, number];
  };
  ":@computed_region_cbhk_fwbd"?: string;
  ":@computed_region_nnqa_25f4"?: string;
}
