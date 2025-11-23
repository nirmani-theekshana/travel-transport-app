import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../redux/favouriteSlice';

export default function DetailsScreen({ route, navigation }) {

  const { transport } = route.params;
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.favourite.list);
  const liked = favourites.some(f => f.id === transport?.id);
  const dark = useSelector(state => state.theme.dark);

  const handleFavourite = () => {
    if (!transport) return;
    dispatch(toggleFavourite(transport));
  };

  const openMap = () => {
    const q = transport?.title || 'Colombo to Kandy';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
    Linking.openURL(url).catch(err => console.log('Could not open map', err));
  };

  return (
    <View style={[styles.container, dark ? styles.containerDark : null]}>

      {/* Flexible Header: title will wrap and header height adjusts to content */}
      <View style={[styles.header, dark ? styles.headerDark : null]}>
        <View style={styles.headerLeftRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'HomeMain' })} style={styles.iconTouchable}>
            <Feather name="arrow-left" size={22} color={'#fff'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, dark ? styles.headerTitleDark : null]}>{transport?.title || 'Route Details'}</Text>
        </View>

        <TouchableOpacity onPress={handleFavourite}>
          <Text style={[styles.heartIcon, liked ? styles.heartLiked : null]}>{liked ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}>

        {/* Route Image */}
        <Image 
          source={{ uri: transport?.thumbnail }}
          style={styles.routeImage}
        />

        {/* Description Box */}
        <View style={[styles.infoCard, dark ? styles.infoCardDark : null]}>
          <Text style={[styles.title, dark ? styles.titleDark : null]}>Description</Text>
          <Text style={[styles.description, dark ? styles.textDark : null]}>
            This express bus service connects Colombo and Kandy with frequent departures
            throughout the day. It offers both AC and Non-AC buses, comfortable seating
            and quick access to major towns along the way. It is ideal for daily
            commuters and tourists.
          </Text>
        </View>

        {/* Schedule Section */}
        <View style={[styles.infoCard, dark ? styles.infoCardDark : null]}>
          <Text style={styles.title}>Schedule & Timings</Text>

          <Text style={styles.text}>• First Bus: 5:00 AM</Text>
          <Text style={styles.text}>• Last Bus: 10:00 PM</Text>
          <Text style={styles.text}>• Frequency: Every 30 minutes</Text>
          <Text style={styles.text}>• Travel Duration: Approx. 3 hours</Text>

          <Text style={styles.subTitle}>Ticket Prices:</Text>
          <Text style={styles.text}>• Non-AC: Rs. 320</Text>
          <Text style={styles.text}>• AC: Rs. 500</Text>
        </View>

        {/* Route Highlights */}
        <View style={[styles.infoCard, dark ? styles.infoCardDark : null]}>
          <Text style={[styles.title, dark ? styles.titleDark : null]}>Route Highlights</Text>
          <Text style={styles.text}>• Passes through Kadawatha, Warakapola & Peradeniya</Text>
          <Text style={styles.text}>• Scenic hill country views</Text>
          <Text style={styles.text}>• Popular with workers, students & tourists</Text>
        </View>

        {/* Location Information */}
        <View style={[styles.infoCard, dark ? styles.infoCardDark : null]}>
          <Text style={[styles.title, dark ? styles.titleDark : null]}>Location Information</Text>
          <Text style={styles.text}>• Starting Point: Colombo Fort Bus Stand</Text>
          <Text style={styles.text}>• Ending Point: Kandy Goods Shed Bus Stand</Text>
        </View>

        {/* Map Button */}
        <TouchableOpacity style={[styles.mapButton, dark ? styles.mapButtonDark : null]} onPress={openMap}>
          <Text style={[styles.mapText, dark ? styles.mapTextDark : null]}>Open Map Link</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Footer placeholder removed — real tab bar will display when Details is inside the Home tab */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerDark: { backgroundColor: '#083432' },

  backIcon: {
    color: 'white',
    fontSize: 20,
  },

  headerLeftRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconTouchable: { paddingRight: 8 },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    flexShrink: 1,
    flexWrap: 'wrap'
  },
  headerTitleDark: { color: '#fff' },
  heartLiked: { color: 'deeppink' },

  heartIcon: {
    fontSize: 22,
  },

  routeImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
  },

  infoCard: {
    backgroundColor: '#BCE4E1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoCardDark: { backgroundColor: '#0b574f' },

  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  titleDark: { color: '#e6fff9' },

  subTitle: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },

  text: {
    fontSize: 14,
    marginBottom: 3,
  },
  textDark: { color: '#dfeffb' },

  description: {
    fontSize: 14,
    lineHeight: 20,
  },

  mapButton: {
    backgroundColor: '#0B4F4D',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 15,
  },
  mapButtonDark: { backgroundColor: '#aeeeee' },

  mapText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mapTextDark: { color: '#000' },
  
});
