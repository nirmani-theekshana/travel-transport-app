import { createSlice } from '@reduxjs/toolkit';

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: { list: []},
  reducers: {
    toggleFavourite: (state, action) => {
      const item = action.payload;
      const idx = state.list.findIndex(i => i.id === item.id);
      if (idx === -1) {
        state.list.push(item);
      } else {
        state.list.splice(idx, 1);
      }
    },
    setFavourites: (state, action) => {
      state.list = action.payload || [];
    },
    clearFavourites: (state) => {
      state.list = [];
    }
  }
});

export const { toggleFavourite, setFavourites, clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
