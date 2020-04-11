import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'historiclocation',
  initialState: {
    locationSource: '',
    locationTypes: [
      'Home',
      'Work',
      'Work Errand',
      'Work Travel',
      'Groceries',
      'Take Out / Drive Thru',
      'Dining Out',
      'Walk / Bike Ride',
      'Gas',
      'Medical Visit',
      'Daycare Pickup / Dropoff',
      'Vacation Travel',
      'Other'
    ],
    locations: [{
      startTime: (new Date()).getTime(),
      duration: 180,
      locationType: 'Home',
      lat: '59.337605685552724',
      long: '18.06960609954454',
    },{
      startTime: 1586506362730,
      duration: 90,
      locationType: 'Work',
      lat: '59.337605685552724',
      long: '18.06960609954454',
    }, {
      startTime: 1586423523680,
      duration: 70,
      locationType: 'Groceries',
      lat: '59.337605685552724',
      long: '18.06960609954454',
    }]
  },
  reducers: {
    addLocation: (state, action) => {
      state.locations = state.locations.push(action.payload);
    },
    setLocationSource: (state, action) => {
      state.locationSource = action.payload;
    }
  },
});

export const { addLocation } = slice.actions;

export const selectHistoricLocationDetails = (state) => state.historiclocation;

export const setLocationSource = slice.actions.setLocationSource;

export default slice.reducer;
