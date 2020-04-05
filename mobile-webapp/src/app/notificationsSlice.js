import { createSlice } from '@reduxjs/toolkit';
import * as R from 'rambda';

export const slice = createSlice({
  name: 'notifications',
  initialState: {
    byId: {},
  },
  reducers: {
    addNotification: (state, action) => {
      const { id, msg, actionCode } = action.payload;
      state.byId[id] = { id, msg, actionCode, status: 'new' };
    },
    updateNotifiactionStatus: (state, action) => {
      const { id, status } = action.payload;
      state.byId[id].status = status;
    },
  },
});

export const { addNotification, updateNotifiactionStatus } = slice.actions;

export const selectNewNotifactions = (state) => {
  const { byId } = state.notifications;
  const ids = R.keys(byId).filter((id) => byId[id].status === 'new');
  return R.map((id) => byId[id], ids);
};

export default slice.reducer;
