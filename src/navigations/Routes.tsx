import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStack } from './stacks/RootStack';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import AuthTabs from './tabs/TabNavigator';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Routes: React.FC = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);

  const handleRoutes: () => ReactNode = () => {
    if (authToken) {
      return <AuthTabs />;
    } else {
      return <RootStack />;
    }
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.screen}>{handleRoutes()}</SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Routes;
