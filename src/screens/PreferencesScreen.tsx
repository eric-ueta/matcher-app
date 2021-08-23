import React, { useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { sizes } from '../config/sizes';
import PreferencesForm from '../components/organisms/PreferencesForm';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreferencesScreen: React.FC = () => {
  const { setSignedIn } = useContext(AuthContext);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    };
  }, []);

  const onSuccess = async () => {
    AsyncStorage.setItem('signedIn', 'true');
    setSignedIn(true);
  };

  return (
    <View style={styles.screen}>
      <PreferencesForm onSuccess={onSuccess} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: sizes.screen.padding,
  },
  text: {
    color: 'red',
  },
});

export default PreferencesScreen;
