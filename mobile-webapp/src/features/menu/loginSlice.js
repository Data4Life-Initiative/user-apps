import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setActivePage } from './menuSlice';
import { profileLoaded, unloadProfile } from '../account/accountSlice';

const endpoint = 'https://mydata4life-api.igrant.io/v1/auth/otp';

const initialState = {
  access_token: '',
  loggedIn: false,
  awaitingOtp: undefined,
  error: undefined,
  working: false,
};

export const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    doLogout: (state) => {
      Object.assign(state, initialState);
    },
    update: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const login = (mobile) => (dispatch) => {
  const { update } = slice.actions;
  dispatch(update({ working: true }));
  axios
    .post(`${endpoint}/send/`, { mobile })
    .then(() => dispatch(update({ awaitingOtp: true, working: false })))
    .catch((error) => dispatch(update({ error, working: false })));
};

export const logout = () => (dispatch) => {
  dispatch(slice.actions.doLogout());
  dispatch(setActivePage('login'));
  dispatch(unloadProfile());
};

export const confirm1 = (mobile, otp) => (dispatch) => {
  dispatch(setActivePage('home'));
}

export const confirm = (mobile, otp) => (dispatch) => {
  const { update } = slice.actions;
  dispatch(update({ working: true }));
  axios
    .post(`${endpoint}/verify/citizen`, { mobile, otp })
    .then((res) => {
      console.log(res);
      const { status, data } = res;
      if (status === 200) {
        const { access_token, profile } = data.data;
        console.log(data);
        dispatch(profileLoaded(profile));
        dispatch(update({ access_token, working: false, loggedIn: true }));
        dispatch(setActivePage('home'));
      } else {
        dispatch(update({ error: data.msg }));
      }
    })
    .catch((error) => dispatch(update({ error, working: false })));
};

export const selectLoginState = (state) => state.login;

export default slice.reducer;
