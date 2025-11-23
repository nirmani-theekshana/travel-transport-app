
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const dark = useSelector(state => state.theme.dark);

  const handleRegister = () => {
    setError('');
    if (!username.trim()) return setError('Please enter a username');
    if (!emailRegex.test(email)) return setError('Please enter a valid email');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirm) return setError('Passwords do not match');

    // Save user to Redux store (simulate account creation)
    dispatch(register({ username: username.trim(), email: email.trim(), password }));
    // After registration, navigate the user to Login to sign in
    navigation.navigate('Login');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, dark ? styles.containerDark : null]}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} />

      <Image source={require('../../assets/splash-icon.png')} style={styles.logo} />
      <Text style={[styles.appName, dark ? styles.appNameDark : null]}>TravelBuddy</Text>

      <View style={styles.form}>
        <Text style={[styles.label, dark ? styles.labelDark : null]}>User name</Text>
        <TextInput style={[styles.input, dark ? styles.inputDark : null]} value={username} onChangeText={setUsername} />

        <Text style={[styles.label, dark ? styles.labelDark : null]}>Email</Text>
        <TextInput style={[styles.input, dark ? styles.inputDark : null]} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

        <Text style={[styles.label, dark ? styles.labelDark : null]}>Password</Text>
        <TextInput style={[styles.input, dark ? styles.inputDark : null]} value={password} onChangeText={setPassword} secureTextEntry />

        <Text style={[styles.label, dark ? styles.labelDark : null]}>Confirm Password</Text>
        <TextInput style={[styles.input, dark ? styles.inputDark : null]} value={confirm} onChangeText={setConfirm} secureTextEntry />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={[styles.registerButton, dark ? styles.registerButtonDark : null]} onPress={handleRegister}>
          <Text style={[styles.registerButtonText, dark ? styles.registerButtonTextDark : null]}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cancelButton, dark ? styles.cancelButtonDark : null]} onPress={handleCancel}>
          <Text style={[styles.cancelButtonText, dark ? styles.cancelButtonTextDark : null]}>Cancel</Text>
        </TouchableOpacity>

        <Text style={[styles.link, dark ? styles.linkDark : null]} onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f6f5', paddingTop: 28, paddingHorizontal: 16, paddingBottom: 12 },
  containerDark: { backgroundColor: '#081f1d' },
  back: { width: 30, height: 30 },
  logo: { width: 70, height: 70, alignSelf: 'center', marginTop: 10 },
  appName: { fontSize: 28, fontWeight: '800', textAlign: 'center', marginTop: 8 },
  appNameDark: { color: '#e6fff9' },
  form: { marginTop: 20 },
  label: { color: '#223', marginBottom: 6 },
  labelDark: { color: '#e6fff9' },
  input: {
    backgroundColor: '#bdeee9',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 16
  },
  inputDark: { backgroundColor: '#0b574f', color: '#fff' },
  registerButton: {
    backgroundColor: '#0b574f',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10
  },
  registerButtonText: { color: 'white', fontWeight: '600' },
  registerButtonDark: { backgroundColor: '#aeeeee' },
  registerButtonTextDark: { color: '#000' },
  cancelButton: {
    backgroundColor: '#0b574f',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
    opacity: 0.9
  },
  cancelButtonText: { color: 'white' },
  cancelButtonDark: { backgroundColor: '#aeeeee' },
  cancelButtonTextDark: { color: '#000' },
  link: { textAlign: 'center', color: '#222', marginTop: 6, fontSize: 12 },
  linkDark: { color: '#cdeee8' },
  error: { color: '#a00', marginBottom: 8, textAlign: 'center' }
});
