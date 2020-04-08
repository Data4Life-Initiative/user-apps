import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseEndpoint = 'https://mydata4life-api.igrant.io/v1';
const allRisksEndpoint = `${baseEndpoint}/risk-assessment/possible-recommendations/`;
const riskAssessmentEndpoint = `${baseEndpoint}/risk-assessment/result/`;

const initialState = {
  riskScore: 0,
  riskPadding: 0,
  working: false,
  initing: false,
  riskValues: {}
};

/* For debugging

export const fetchRiskDetails1 = (token) => (dispatch) => {
  if(initialState.riskValues.length > 0) {
    return;
  }
  const { update } = slice.actions;
  dispatch(update({ initing: true }));
  setTimeout(() => {
    dispatch(update({ riskValues: {
      "0": {
          "recommendation": "Stay cautious as this is a serious pandemic",
          "upper_limit": 2,
          "lower_limit": 1,
          "recommendation_detail": "Based on your health profile and based on your contact tracing record, you are perceived to have low risk of being infected. We recommend you to stay cautious as this is a serious pandemic."
      },
      "1": {
          "recommendation": "Stay at home with limited movements",
          "upper_limit": 4,
          "lower_limit": 3,
          "recommendation_detail": "Based on your health profile and based on your contact tracing record, you are perceived to have low risk of being infected. We recommend you to stay at home with limited movements."
      },
      "2": {
          "recommendation": "Self Quarantine",
          "upper_limit": 6,
          "lower_limit": 5,
          "recommendation_detail": "Based on your health profile and based on your contact tracing record, you are perceived to be at risk of infected. We recommend you to stay indoor and self quarantine."
      },
      "3": {
          "recommendation": "Get yourself tested",
          "upper_limit": 8,
          "lower_limit": 7,
          "recommendation_detail": "Based on your health profile and based on your contact tracing record, you are perceived to be at higher risk of infected. We recommend you to get tested."
      },
      "4": {
          "recommendation": "Stay in isolation as you are positive",
          "upper_limit": 10,
          "lower_limit": 9,
          "recommendation_detail": "Based on your health profile and based on your contact tracing record, you are perceived to be infected. We recommend you to stay isolated."
      }}, initing: false }));
  }, 1500);
};

export const fetchRiskScore1 = (token) => (dispatch) => {
  const { update } = slice.actions;
  dispatch(update({ working: true }));
  setTimeout(() => {
    dispatch(update({ riskScore: Math.round(Math.random() * 100) / 10, working: false }));
  }, 300);
};

*/

export const fetchRiskDetails = (token) => (dispatch) => {
  if(initialState.riskValues.length > 0) {
    return;
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };  
  const { update } = slice.actions;
  dispatch(update({ initing: true }));
  axios
    .get(allRisksEndpoint, config)
    .then((res) => {
      const { status, data } = res;
      if (status === 200) {
        const { possible_values } = data.data;
        dispatch(update({ riskValues: possible_values, initing: false }));
      } else {
        dispatch(update({ error: data.msg, initing: false }));
      }
    })
    .catch((error) => dispatch(update({ error, initing: false })));
};

export const fetchRiskScore = (token) => (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };  
  const { update } = slice.actions;
  dispatch(update({ working: true }));
  axios
    .get(riskAssessmentEndpoint, config)
    .then((res) => {
      const { status, data } = res;
      if (status === 200) {
        const { score } = data.data;
        dispatch(update({ riskScore: score, working: false }));
      } else {
        dispatch(update({ error: data.msg, working: false }));
      }
    })
    .catch((error) => dispatch(update({ error, working: false })));
};

export const slice = createSlice({
  name: 'riskscore',
  initialState,
  reducers: {
    update: (state, action) => {
      Object.assign(state, action.payload);
    },
    setRiskPadding: (state, action) => {
      state.riskPadding = action.payload;
    },
  },
});

export default slice.reducer;

export const setRiskPadding = slice.actions.setRiskPadding;

export const selectRiskScore = (state) => state.riskscore;
