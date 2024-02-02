export interface RoomQueryResult {
  room: RoomItem[];
}

export interface RoomItem {
  name: string;
  latitude: number;
  longitude: number;
  buildingName: string;
  number: string;
}