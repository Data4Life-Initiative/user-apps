import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as R from 'rambda';

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
    setData: (state, action) => {
      state.data = action.payload;
    },
    toggleHeatMap: (state) => {
      state.show = !state.show;
    },
  },
});

export const { addData } = slice.actions;

export const selectHeatmapData = (state) => state.heatmap.data;
export const selectCenter = (state) => state.heatmap.center;

const toLatLng = R.map((e) => ({
  lat: parseFloat(e.lat),
  lng: parseFloat(e.long),
  t: parseInt(e.timestamp),
}));
const processData = R.compose(
  // R.sortBy(R.prop('timestamp')),
  toLatLng
  // R.flatten,
);

const endpoint = 'https://mydata4life-api.igrant.io/v1/disease/hotspots/';
export const fetchHotspotData = (token) => (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios.get(endpoint, config).then((res) => {
    const data = processData(res.data.data.disease_hotspots);
    dispatch(slice.actions.setData(data));
  });
};

export default slice.reducer;
