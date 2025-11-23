import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import TransportCard from '../components/TransportCard';
import { useSelector } from 'react-redux';

export default function HomeScreen({ navigation }) {

  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState('');

  const user = useSelector(state => state.auth.user);
  const dark = useSelector(state => state.theme.dark);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => setRoutes(res.data.products))
      .catch(err => console.log(err));
  }, []);

  const filteredRoutes = routes.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const openMapForQuery = (q) => {
    if (!q) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
    Linking.openURL(url).catch(err => console.log('Error opening map', err));
  };

  return (
    <View style={[styles.container, dark ? styles.containerDark : null]}>

      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.header}>
          <Text style={[styles.headerText, dark ? styles.headerTextDark : null]}>Hello {user?.username || user?.email || "Traveler"}</Text>
          <Text style={[styles.subtitle, dark ? styles.subtitleDark : null]}>Have a safe trip!</Text>
        </View>
      </View>

      {/* Search Bar (press Go on keyboard to open map) */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search here..."
            value={search}
            onChangeText={setSearch}
            returnKeyType="go"
            onSubmitEditing={() => openMapForQuery(search)}
          />
        </View>
      </View>

      {/* Transport List (2 columns) */}
      <FlatList
        data={filteredRoutes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TransportCard route={item} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />

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

  header: {
    backgroundColor: '#0B4F4D',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  headerDark: { backgroundColor: '#083432' },

  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  headerTextDark: { color: '#e6fff9' },

  subtitle: {
    color: '#d0f0ed',
    marginTop: 3
  },
  subtitleDark: { color: '#cdeee8' },

  headerRow: { marginBottom: 10 },

  searchInput: {
    backgroundColor: '#BCE4E1',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    flex: 1
  },
  searchRow: { marginBottom: 10 },
  searchBox: { flexDirection: 'row', alignItems: 'center' }
});
