import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const endpoint = 'https://mydata4life-api.igrant.io/v1/risk-assessment/result';

const initialState = {
  riskScore: 7,
  working: false,
};

export const slice = createSlice({
  name: 'riskscore',
  initialState,
  reducers: {
    update: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export default slice.reducer;

export const selectRiskScore = (state) => state.riskscore;

const riskOracle = [5.9, 7.3];
let fetchCount = 0;

export const fetchRiskScore = () => (dispatch) => {
  const { update } = slice.actions;
  const riskScore = riskOracle[fetchCount];
  fetchCount = (fetchCount + 1) % riskOracle.length;
  dispatch(update({ working: true }));
  setTimeout(() => dispatch(update({ riskScore, working: false })), 1000);
};
