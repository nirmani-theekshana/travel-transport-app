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
import ROUTE_DESCRIPTIONS from '../data/routeDescriptions';

// Local image map for details view
const IMAGE_MAP = {
  'colombo-kandy-fallback': require('../../assets/colombo-kandy.png'),
  'colombo-galle-fallback': require('../../assets/colombo-galle.png'),
  'colombo-ella-fallback': require('../../assets/colombo-ella.png')
};

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

  // select the appropriate route details by id or title keywords
  const selectDetailsForTransport = (t) => {
    if (!t) return ROUTE_DESCRIPTIONS['colombo-kandy-fallback'];
    // prefer exact id match
    if (t.id && ROUTE_DESCRIPTIONS[t.id]) return ROUTE_DESCRIPTIONS[t.id];
    const title = (t.title || '').toLowerCase();
    if (title.includes('galle')) return ROUTE_DESCRIPTIONS['colombo-galle-fallback'];
    if (title.includes('ella')) return ROUTE_DESCRIPTIONS['colombo-ella-fallback'];
    if (title.includes('kandy')) return ROUTE_DESCRIPTIONS['colombo-kandy-fallback'];
    // fallback to kandy
    return ROUTE_DESCRIPTIONS['colombo-kandy-fallback'];
  };

  const details = selectDetailsForTransport(transport);

  const openMap = () => {
    const q = details?.mapQuery || transport?.title || 'Colombo to Kandy';
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
          source={(
            // prefer explicit mapping by transport id -> IMAGE_MAP
            (transport && transport.id && IMAGE_MAP[transport.id]) ||
            // prefer mapping by selected details id
            (details && details.id && IMAGE_MAP[details.id]) ||
            // use transport thumbnail if provided (string -> uri)
            (transport && transport.thumbnail ? (typeof transport.thumbnail === 'string' ? { uri: transport.thumbnail } : transport.thumbnail) : null) ||
            // final fallback: app logo
            require('../../assets/logo.png')
          )}
          style={styles.routeImage}
        />

        {/* Description Box */}
        <View style={[styles.infoCard, dark ? styles.infoCardDark : null]}>
          <Text style={[styles.title, dark ? styles.titleDark : null]}>Description</Text>
          <Text style={[styles.description, dark ? styles.textDark : null]}>
            {details?.description}
          </Text>
        </View>

        {/* Schedule Section */}
        <View style={[styles.infoCard, dark ? styles.infoCardDark : null]}>
          <Text style={styles.title}>Schedule & Timings</Text>
          {details?.schedule?.map((s, i) => (
            <Text key={i} style={styles.text}>• {s}</Text>
          ))}
          <Text style={styles.text}>• Travel Duration: {details?.duration}</Text>

          <Text style={styles.subTitle}>Ticket Prices:</Text>
          {details?.ticketPrice?.map((p, i) => (
            <Text key={i} style={styles.text}>• {p}</Text>
          ))}
        </View>

        {/* Route Highlights */}
        <View style={[styles.infoCard, dark ? styles.infoCardDark : null]}>
          <Text style={[styles.title, dark ? styles.titleDark : null]}>Route Highlights</Text>
          {details?.highlights?.map((h, i) => (
            <Text key={i} style={styles.text}>• {h}</Text>
          ))}
        </View>

        {/* Location Information */}
        <View style={[styles.infoCard, dark ? styles.infoCardDark : null]}>
          <Text style={[styles.title, dark ? styles.titleDark : null]}>Location Information</Text>
          <Text style={styles.text}>• Starting Point: {details?.locationInfo?.start}</Text>
          <Text style={styles.text}>• Ending Point: {details?.locationInfo?.end}</Text>
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
