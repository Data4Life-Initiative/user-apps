import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'menu',
  initialState: {
    showMain: false,
    activePage: 'home',
  },
  reducers: {
    toggleMain: (state) => {
      state.showMain = !state.showMain;
    },
    setActivePage: (state, action) => {
      state.showMain = false;
      state.activePage = action.payload;
    },
  },
});

export const { toggleMain, setActivePage } = slice.actions;

export const selectShowMenu = (state) => {
  const { showMain, activePage } = state.menu;
  return showMain | (activePage !== 'home');
};
export const selectActivePage = (state) => {
  const { showMain, activePage } = state.menu;
  return showMain ? 'main' : activePage;
};

export default slice.reducer;
