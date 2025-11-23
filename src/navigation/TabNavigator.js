import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import HomeStack from './HomeStack';
import FavouriteScreen from '../screens/FavouriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const dark = useSelector(state => state.theme.dark);
  const tabBarStyle = {
    backgroundColor: dark ? '#06312e' : '#0B574D',
    borderTopWidth: 0,
    height: 64,
    paddingBottom: 8
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor: '#aeeeee',
        tabBarInactiveTintColor: '#ffffff88',
        tabBarIcon: ({ focused, color, size }) => {
          let name = 'home';
          if (route.name === 'Home') name = 'home';
          else if (route.name === 'Favourites') name = 'heart';
          else if (route.name === 'Profile') name = 'user';
          return <Feather name={name} size={size ?? 22} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
