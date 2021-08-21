import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NetworkManager } from './src/components/organisms/NetworkManager';
import { AuthProvider } from './src/contexts/authContext';
import Routes from './src/navigations/Routes';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <NetworkManager>
          <Routes />
        </NetworkManager>
      </AuthProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});

export default App;
