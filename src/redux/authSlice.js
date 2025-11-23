import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  // `registered` holds the saved account created via Register screen.
  // `user` represents the currently logged-in user/session.
  initialState: { user: null, registered: null },
  reducers: {
    register: (state, action) => {
      state.registered = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
