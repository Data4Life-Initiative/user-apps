import { createSlice } from '@reduxjs/toolkit';
import * as R from 'rambda';
import { data } from '../heatmap/dummyHeat';

const profile = {
  age: 37,
  mobile: '+46730425625',
  home: {
    coords: {
      lat: '59.329444',
      long: '18.068611',
    },
  },
  location_data: [
    {
      location_source: 'fabian',
      locations: data,
    },
  ],
  infection_status: '',
};

export const slice = createSlice({
  name: 'account',
  initialState: {
    profile: profile,
  },
  reducers: {
    profileLoaded: (state, action) => {
      state.profile = action.payload;
    },
    unloadProfile: (state) => {
      state.profile = {};
    },
    setHealthStatus: (state, action) => {
      state.profile.infection_status = action.payload;
    },
  },
});

export const { profileLoaded, unloadProfile, setHealthStatus } = slice.actions;

export const selectAccountDetails = (state) => {
  const { profile } = state.account;
  return {
    age: profile.age,
    mobile: profile.mobile,
    infection_status: profile.infection_status || ''
  };
};

export const selectHome = (state) => {
  const { profile } = state.account;
  return profile.home
    ? {
        lat: parseFloat(profile.home.coords.lat),
        lng: parseFloat(profile.home.coords.long),
      }
    : undefined;
};

export const selectLocationHistory = (lookBack) => (state) => {
  const { location_data } = state.account.profile;
  // const filterWindow = lookBack | (1000 * 60 * 60 * 24 * 14)
  // const threshold = Date.now() - filterWindow;
  // const winFilter = R.filter(e => e.t >= threshold);
  const process = R.map((e) => ({
    lat: parseFloat(e.lat),
    lng: parseFloat(e.long),
    t: parseInt(e.timestamp),
  }));
  const extract = R.map((source) => source.locations);

  const chain = R.compose(
    R.sortBy(R.prop('timestamp')),
    process,
    R.flatten,
    extract
  );

  return chain(location_data);
};

export default slice.reducer;
