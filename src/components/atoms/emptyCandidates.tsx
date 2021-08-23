import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from 'react-native';
//@ts-ignore
import noCandidates from '../../assets/backgrounds/no_candidates.jpg';
import colors from '../../config/colors';
import LargeText from './LargeText';

const EmptyCandidates: React.FC = () => {
  return (
    <View style={styles.screen}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={noCandidates} style={{ flex: 1 }} resizeMode="stretch" />
      </View>
      <View style={{ flex: 1, padding: 10, backgroundColor: colors.secondary }}>
        <LargeText style={styles.text}>
          Desculpe . . . {'\n'}Não foi possível encontrar ninguém na sua região.
          {'\n'}
          Tente novamente mais tarde.
        </LargeText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    color: colors.white,
    alignSelf: 'center',
    textAlign: 'left',
    textAlignVertical: 'center',
    flex: 1,
  },
});

export default EmptyCandidates;
