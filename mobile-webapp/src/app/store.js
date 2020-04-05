import { configureStore } from '@reduxjs/toolkit';
import heatmapReducer from '../features/heatmap/heatmapSlice';
import menuReducer from '../features/menu/menuSlice';
import loginReducer from '../features/menu/loginSlice';
import accountReducer from '../features/account/accountSlice';
import riskscoreReducer from '../features/riskscore/riskSlice';

export default configureStore({
  reducer: {
    heatmap: heatmapReducer,
    menu: menuReducer,
    login: loginReducer,
    account: accountReducer,
    riskscore: riskscoreReducer,
  },
});
