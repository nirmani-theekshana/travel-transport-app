import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function FavouriteScreen({ navigation }) {

  const favourites = useSelector(state => state.favourite.list);
  const dark = useSelector(state => state.theme.dark);

  const IMAGE_MAP = {
    'colombo-kandy-fallback': require('../../assets/colombo-kandy.png'),
    'colombo-galle-fallback': require('../../assets/colombo-galle.png'),
    'colombo-ella-fallback': require('../../assets/colombo-ella.png')
  };

  return (
    <View style={[styles.container, dark ? styles.containerDark : null]}>

      <View style={[styles.header, dark ? styles.headerDark : null]}>
        <View style={styles.headerLeftRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconTouchable}>
            <Feather name="arrow-left" size={20} color={'#fff'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, dark ? styles.headerTitleDark : null]}>Your Favourite Routes</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      {favourites.length === 0 ? (
        <Text style={[styles.emptyText, dark ? styles.emptyTextDark : null]}>No favourites added yet</Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Home', { screen: 'Details', params: { transport: item } })}>

              <Image
                source={(
                  (item && item.id && IMAGE_MAP[item.id]) ||
                  (item && item.title && item.title.toLowerCase().includes('kandy') && IMAGE_MAP['colombo-kandy-fallback']) ||
                  (item && item.title && item.title.toLowerCase().includes('galle') && IMAGE_MAP['colombo-galle-fallback']) ||
                  (item && item.title && item.title.toLowerCase().includes('ella') && IMAGE_MAP['colombo-ella-fallback']) ||
                  (item && item.thumbnail ? (typeof item.thumbnail === 'string' ? { uri: item.thumbnail } : item.thumbnail) : require('../../assets/logo.png'))
                )}
                style={styles.image}
              />

              <View style={styles.info}>
                <Text style={styles.routeTitle}>{item.title || 'Route'}</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>

            </TouchableOpacity>
          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F7',
    paddingTop: 28,
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  containerDark: { backgroundColor: '#071f1d' },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  titleDark: { color: '#e6fff9' },

  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50
  },
  emptyTextDark: { color: '#cdeee8' },

  header: {
    backgroundColor: '#0B4F4D',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  headerDark: { backgroundColor: '#083432' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  headerTitleDark: { color: '#fff' },
  backIcon: { color: '#fff', fontSize: 20 },
  headerLeftRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconTouchable: { paddingRight: 8 },

  card: {
    backgroundColor: '#BCE4E1',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10
  },

  info: {
    flex: 1
  },

  routeTitle: {
    fontWeight: 'bold',
    fontSize: 15
  },

  description: {
    fontSize: 12,
    marginTop: 3
  }
});
