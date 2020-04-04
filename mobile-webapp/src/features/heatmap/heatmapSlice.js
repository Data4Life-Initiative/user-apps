import { createSlice } from '@reduxjs/toolkit';
// import { data } from './dummyHeat';

export const slice = createSlice({
  name: 'heatmap',
  initialState: {
    data: [],
    show: false,
    center: {
      lat: 59.329444,
      lng: 18.068611,
    },
  },
  reducers: {
    setCenter: (state, center) => {
      state.center = center;
    },
    addData: (state, action) => {
      state.data.push(action.payload);
    },
    toggleHeatMap: (state) => {
      state.show = !state.show;
    },
  },
});

export const { addData } = slice.actions;

export const selectHeatmapData = (state) => state.heatmap.data;
export const selectCenter = (state) => state.heatmap.center;

export default slice.reducer;
