import { createSlice } from '@reduxjs/toolkit';
import { data } from './dummyHeat'

export const slice = createSlice({
  name: 'heatmap',
  initialState: {
    data,
    show: false,
  },
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload)
    },
    toggleHeatMap: state => {
      state.show = !state.show
    }
  },
});

export const { addData } = slice.actions;

export const selectHeatmapData = state => state.heatmap.data;

export default slice.reducer;
