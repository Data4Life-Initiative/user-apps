import { configureStore } from '@reduxjs/toolkit';
import heatmapReducer from '../features/heatmap/heatmapSlice';
import menuReducer from '../features/menu/menuSlice';
import loginReducer from '../features/menu/loginSlice';

export default configureStore({
  reducer: {
    heatmap: heatmapReducer,
    menu: menuReducer,
    login: loginReducer,
  },
});
