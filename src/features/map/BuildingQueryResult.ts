export interface BuildingQueryResult {
  building: BuildingItem[];
}

export interface BuildingItem {
  name: string;
  latitude: number;
  longitude: number;
  url: string | null;
}