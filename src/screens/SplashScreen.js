import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function SplashScreen({ navigation }) {
  const dark = useSelector(state => state.theme?.dark);
  return (
    <View style={[styles.container, dark ? styles.containerDark : null]}>
      <View style={styles.top} />

      <Text style={[styles.title, dark ? styles.titleDark : null]}>TravelBuddy</Text>
      <Text style={[styles.subtitle, dark ? styles.subtitleDark : null]}>Plan your journey. Travel with confidence.</Text>

      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ee3df',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 48
  },
  top: { height: 20 },
  title: {
    marginTop: 36,
    fontSize: 62,
    fontWeight: '800',
    color: '#053732',
    letterSpacing: 1
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#083535',
    textAlign: 'center',
    lineHeight: 22,
    marginHorizontal: 24
  },
  logo: {
    width: 450,
    height: 450,
    resizeMode: 'contain',
    marginTop: 8
  },
  button: {
    backgroundColor: '#0b574f',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 16,
    alignSelf: 'center',
    elevation: 3
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  bottomSpacer: { height: 20 },
  containerDark: { backgroundColor: '#06312e' },
  titleDark: { color: '#e6fff9' },
  subtitleDark: { color: '#cdeee8' }
});
