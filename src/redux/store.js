import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import favouriteReducer from './favouriteSlice';
import themeReducer from './themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// middleware to persist certain parts of the Redux state into AsyncStorage
const persistMiddleware = storeAPI => next => async action => {
  const result = next(action);
  try {
    const state = storeAPI.getState();

    // If logout action, remove user item
    if (action.type === 'auth/logout') {
      await AsyncStorage.removeItem('user');
    } else {
      await AsyncStorage.setItem('registered', JSON.stringify(state.auth.registered));
      await AsyncStorage.setItem('user', JSON.stringify(state.auth.user));
      await AsyncStorage.setItem('favourites', JSON.stringify(state.favourite.list));
      await AsyncStorage.setItem('theme', JSON.stringify(state.theme));
    }
  } catch (err) {
    console.log('Persist middleware error', err);
  }
  return result;
};

export default configureStore({
  reducer: {
    auth: authReducer,
    favourite: favouriteReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware)
});
