import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Switch, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from '../redux/authSlice';
import { toggleTheme } from '../redux/themeSlice';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation }) {

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const dark = useSelector(state => state.theme.dark);

  useEffect(() => {
    setAvatar(user?.avatar || null);
    setUsername(user?.username || '');
    setEmail(user?.email || '');
  }, [user]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Permission to access photos is required to change your profile picture.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setAvatar(uri);
        // Update user in redux so greeting/profile reflect change
        dispatch(login({ ...(user || {}), avatar: uri, username, email }));
      }
    } catch (err) {
      console.log('Image pick error', err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Register');
  };

  const handleSave = () => {
    dispatch(login({ ...(user || {}), username: username.trim(), email: email.trim(), avatar }));
    Alert.alert('Saved', 'Profile updated');
  };

  return (
    <View style={[styles.container, dark ? styles.containerDark : null]}>

      {/* Header with back arrow */}
      <View style={[styles.header, dark ? styles.headerDark : null]}>
        <View style={styles.headerLeftRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconTouchable}>
            <Feather name="arrow-left" size={20} color={'#fff'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, dark ? styles.headerTitleDark : null]}>Profile</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      {/* Avatar and edit */}
      <View style={styles.avatarWrap}>
        <TouchableOpacity onPress={pickImage}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Editable card */}
      <View style={[styles.infoCard, dark ? styles.infoCardDark : null]}>
        <Text style={styles.label}>User Name</Text>
        <TextInput value={username} onChangeText={setUsername} style={[styles.input, dark ? styles.inputDark : null]} />

        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} style={[styles.input, dark ? styles.inputDark : null]} keyboardType="email-address" />

        <TouchableOpacity style={[styles.saveBtn, dark ? styles.saveBtnDark : null]} onPress={handleSave}>
          <Text style={[styles.saveText, dark ? styles.saveTextDark : null]}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Dark mode toggle */}
      <View style={[styles.optionCard, dark ? styles.optionCardDark : null]}>
        <Text style={[styles.optionText, dark ? styles.optionTextDark : null]}>Dark Mode</Text>
        <Switch value={dark} onValueChange={() => dispatch(toggleTheme())} />
      </View>

      <View style={[styles.optionCard, dark ? styles.optionCardDark : null]}>
        <Text style={[styles.optionText, dark ? styles.optionTextDark : null]}>App Version</Text>
        <Text style={dark ? styles.optionTextDark : null}>1.0</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutBtn}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

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
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    justifyContent: 'space-between'
  },
  headerDark: { backgroundColor: '#083432' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  headerTitleDark: { color: '#fff' },
  backIcon: { color: '#fff', fontSize: 22 },
  headerLeftRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconTouchable: { paddingRight: 8 },

  avatarWrap: { alignItems: 'center', marginBottom: 12 },

  profileCard: {
    backgroundColor: '#0B4F4D',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20
  },

  avatar: {
    backgroundColor: '#BCE4E1',
    padding: 15,
    borderRadius: 50,
    marginBottom: 10
  },

  avatarText: {
    fontSize: 28
  },

  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: '#fff'
  },

  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: '#BCE4E1',
    alignItems: 'center',
    justifyContent: 'center'
  },

  infoCard: {
    backgroundColor: '#BCE4E1',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },
  infoCardDark: { backgroundColor: '#0b574f' },

  label: { fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: '#eaf9f6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  inputDark: { backgroundColor: '#0b574f', color: '#fff' },
  saveBtn: { backgroundColor: '#0b574f', padding: 12, borderRadius: 10, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '600' },
  saveBtnDark: { backgroundColor: '#aeeeee' },
  saveTextDark: { color: '#000' },

  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },

  subtitle: {
    color: '#d1f2ef',
    fontSize: 12
  },

  optionCard: {
    backgroundColor: '#BCE4E1',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  optionCardDark: { backgroundColor: '#0b574f' },

  optionText: {
    fontWeight: 'bold'
  },
  optionTextDark: { color: '#e6fff9' },

  logoutBtn: {
    backgroundColor: '#C0392B',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },

  logoutText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
