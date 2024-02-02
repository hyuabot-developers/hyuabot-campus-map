import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuildingItem } from "./BuildingQueryResult";

export interface MapState {
  bound: kakao.maps.LatLngBounds
  result: BuildingItem[]
}

const initialState: MapState = {
  bound: new kakao.maps.LatLngBounds(),
  result: []
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setBound: (state, action: PayloadAction<kakao.maps.LatLngBounds>) => {
      state.bound = action.payload;
    },
    setResult: (state, action: PayloadAction<BuildingItem[]>) => {
      state.result = action.payload;
    }
  },
});

export const { setBound, setResult } = mapSlice.actions;

export default mapSlice.reducer;
