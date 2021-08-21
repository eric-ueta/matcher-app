import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import LargeText from '../components/atoms/LargeText';

// import { Container } from './styles';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <LargeText>BEM VINDO</LargeText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default HomeScreen;
