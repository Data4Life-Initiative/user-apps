import { configureStore } from '@reduxjs/toolkit';
import heatmapReducer from '../features/heatmap/heatmapSlice';

export default configureStore({
  reducer: {
    heatmap: heatmapReducer,
  },
});
