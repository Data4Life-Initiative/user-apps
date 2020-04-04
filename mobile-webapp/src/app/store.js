import { configureStore } from '@reduxjs/toolkit';
import heatmapReducer from '../features/heatmap/heatmapSlice';
import menuReducer from '../features/menu/menuSlice';

export default configureStore({
  reducer: {
    heatmap: heatmapReducer,
    menu: menuReducer,
  },
});
