import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { register, login } from './src/redux/authSlice';
import { setFavourites } from './src/redux/favouriteSlice';
import { setDark } from './src/redux/themeSlice';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function hydrate() {
      try {
        const reg = await AsyncStorage.getItem('registered');
        const user = await AsyncStorage.getItem('user');
        const fav = await AsyncStorage.getItem('favourites');
        const theme = await AsyncStorage.getItem('theme');

        if (reg) dispatch(register(JSON.parse(reg)));
        if (user && JSON.parse(user)) dispatch(login(JSON.parse(user)));
        if (fav) dispatch(setFavourites(JSON.parse(fav)));
        if (theme) {
          const t = JSON.parse(theme);
          if (t && typeof t.dark === 'boolean') dispatch(setDark(t.dark));
        }
      } catch (err) {
        console.log('Hydration error', err);
      }
    }
    hydrate();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
