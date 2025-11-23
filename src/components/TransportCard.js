import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../redux/favouriteSlice';
import { useNavigation } from '@react-navigation/native';

export default function TransportCard({ route }) {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favourites = useSelector(state => state.favourite.list);
  const liked = favourites.some(f => f.id === route.id);
  const dark = useSelector(state => state.theme.dark);

  const handleFavourite = () => {
    dispatch(toggleFavourite(route));
  };

  return (
    <TouchableOpacity
      style={[styles.card, dark ? styles.cardDark : null]}
      onPress={() => navigation.navigate('Details', { transport: route })}
    >
      {/* Image */}
      <Image source={{ uri: route.thumbnail }} style={styles.image} />

      {/* Route Name */}
      <Text style={[styles.title, dark ? styles.titleDark : null]}>Colombo to Kandy</Text>

      {/* Description */}
      <Text numberOfLines={2} style={[styles.description, dark ? styles.descriptionDark : null]}>
        {route.description}
      </Text>

      {/* Status */}
      <Text style={[styles.status, dark ? styles.statusDark : null]}>Active</Text>

      {/* Favourite Button */}
      <TouchableOpacity onPress={handleFavourite} style={styles.heartBtn}>
        <Text style={[styles.heart, liked ? styles.heartLiked : null]}>{liked ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#BCE4E1',
    flex: 1,
    margin: 8,
    borderRadius: 12,
    padding: 10,
    minWidth: 140,
    maxWidth: '48%'
  },
  cardDark: { backgroundColor: '#0b574f' },

  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 6,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleDark: { color: '#e6fff9' },

  description: {
    fontSize: 13,
    color: '#333',
  },
  descriptionDark: { color: '#dfeffb' },

  status: {
    fontSize: 12,
    color: 'green',
    marginTop: 3,
  },
  statusDark: { color: '#cdeee8' },

  heartBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  heart: {
    fontSize: 20,
  },
  heartLiked: {
    color: 'deeppink'
  }
});
