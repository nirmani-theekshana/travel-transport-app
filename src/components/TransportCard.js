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

  // Local image map: map known route ids (or keys) to local assets.
  // Add the corresponding PNG files to `assets/` (e.g. colombo-kandy.png).
  const IMAGE_MAP = {
    'colombo-kandy-fallback': require('../../assets/colombo-kandy.png'),
    'colombo-galle-fallback': require('../../assets/colombo-galle.png'),
    'colombo-ella-fallback': require('../../assets/colombo-ella.png'),
    'colombo-rathnapura-fallback': require('../../assets/colombo-rathnapura.png'),
  };

  // Determine image source: prefer explicit local mapping, then route.thumbnail (remote or local), then logo.
  const imgSource = (() => {
    if (route && route.id && IMAGE_MAP[route.id]) return IMAGE_MAP[route.id];
    if (route && route.title) {
      const t = route.title.toLowerCase();
      if (t.includes('kandy') && IMAGE_MAP['colombo-kandy-fallback']) return IMAGE_MAP['colombo-kandy-fallback'];
      if (t.includes('galle') && IMAGE_MAP['colombo-galle-fallback']) return IMAGE_MAP['colombo-galle-fallback'];
      if (t.includes('ella') && IMAGE_MAP['colombo-ella-fallback']) return IMAGE_MAP['colombo-ella-fallback'];
    }
    if (route && route.thumbnail) return (typeof route.thumbnail === 'string') ? { uri: route.thumbnail } : route.thumbnail;
    return require('../../assets/logo.png');
  })();

  return (
    <TouchableOpacity
      style={[styles.card, dark ? styles.cardDark : null]}
      onPress={() => navigation.navigate('Details', { transport: route })}
    >
      {/* Image */}
      <Image source={imgSource} style={styles.image} />

      {/* Route Name */}
      <Text style={[styles.title, dark ? styles.titleDark : null]}>{route.title || 'Colombo to Kandy'}</Text>

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
    maxWidth: '100%'
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
