import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { dark: false },
  reducers: {
    toggleTheme: (state) => { state.dark = !state.dark },
    setDark: (state, action) => { state.dark = !!action.payload }
  }
});

export const { toggleTheme, setDark } = themeSlice.actions;
export default themeSlice.reducer;
