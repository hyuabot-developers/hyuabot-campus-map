import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MapState {
  bound: kakao.maps.LatLngBounds
}

const initialState: MapState = {
  bound: new kakao.maps.LatLngBounds()
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setBound: (state, action: PayloadAction<kakao.maps.LatLngBounds>) => {
      state.bound = action.payload;
    }
  },
});

export const { setBound } = mapSlice.actions;

export const selectBound = (state: RootState) => state.map.bound;

export default mapSlice.reducer;
