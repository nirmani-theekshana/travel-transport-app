import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const dark = useSelector(state => state.theme.dark);
  const storedRegistered = useSelector(state => state.auth.registered);

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Require an existing registered account (email + password) before allowing login
    if (!storedRegistered || storedRegistered.email !== email || storedRegistered.password !== password) {
      setError('Account not found or password incorrect. Please register or check credentials.');
      return;
    }

    // Successful login: set active user and navigate
    dispatch(login(storedRegistered));
    navigation.navigate('MainTabs');
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <View style={[styles.container, dark ? styles.containerDark : null]}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Splash')} />

      <Image source={require('../../assets/splash-icon.png')} style={styles.logo} />
      <Text style={[styles.appName, dark ? styles.appNameDark : null]}>TravelBuddy</Text>

      <View style={styles.form}>
        <Text style={[styles.label, dark ? styles.labelDark : null]}>Email</Text>
        <TextInput
          placeholder=""
          style={[styles.input, dark ? styles.inputDark : null]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, dark ? styles.labelDark : null]}>Password</Text>
        <TextInput
          placeholder=""
          style={[styles.input, dark ? styles.inputDark : null]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={[styles.loginButton, dark ? styles.loginButtonDark : null]} onPress={handleLogin}>
          <Text style={[styles.loginButtonText, dark ? styles.loginButtonTextDark : null]}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cancelButton, dark ? styles.cancelButtonDark : null]} onPress={handleCancel}>
          <Text style={[styles.cancelButtonText, dark ? styles.cancelButtonTextDark : null]}>Cancel</Text>
        </TouchableOpacity>

        <Text style={[styles.link, dark ? styles.linkDark : null]} onPress={() => navigation.navigate('Register')}>
          Don't have an account? Register
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f6f5', paddingTop: 28, paddingHorizontal: 16, paddingBottom: 12 },
  containerDark: { backgroundColor: '#081f1d' },
  back: { width: 30, height: 30 },
  logo: { width: 80, height: 80, alignSelf: 'center', marginTop: 10 },
  appName: { fontSize: 30, fontWeight: '800', textAlign: 'center', marginTop: 12 },
  appNameDark: { color: '#e6fff9' },
  form: { marginTop: 28 },
  label: { color: '#223', marginBottom: 8 },
  labelDark: { color: '#e6fff9' },
  input: {
    backgroundColor: '#bdeee9',
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 18,
    minHeight: 48
  },
  inputDark: { backgroundColor: '#0b574f', color: '#fff' },
  loginButton: {
    backgroundColor: '#0b574f',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12
  },
  loginButtonText: { color: 'white', fontWeight: '600' },
  loginButtonDark: { backgroundColor: '#aeeeee' },
  loginButtonTextDark: { color: '#000' },
  cancelButton: {
    backgroundColor: '#0b574f',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
    opacity: 0.95
  },
  cancelButtonText: { color: 'white' },
  cancelButtonDark: { backgroundColor: '#aeeeee' },
  cancelButtonTextDark: { color: '#000' },
  link: { textAlign: 'center', color: '#222', marginTop: 12, fontSize: 12 },
  linkDark: { color: '#cdeee8' },
  error: { color: '#a00', marginBottom: 8, textAlign: 'center' }
});
