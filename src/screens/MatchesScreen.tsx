import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Image, Linking, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import env from '../../env';
import { Candidate } from '../@types/candidate';
import LargeText from '../components/atoms/LargeText';
import colors from '../config/colors';
import { sizes } from '../config/sizes';
import matchService from '../services/matchService';
import defaultUser from '../assets/icons/default-user.png';

const MatchesScreen: React.FC = () => {
  const [matches, setMatches] = useState<Array<Candidate>>([]);

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = async () => {
    const response = await matchService.getMatches();
    console.log(response);
    setMatches(response);
  };

  const openWhatsapp = number => {
    let x = '55' + number;
    Linking.openURL(`whatsapp://send?phone=${x}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {matches.map(match => {
        return (
          <View key={match.id} style={styles.row}>
            <View>
              {match?.images.length > 0 ? (
                <Image
                  width={70}
                  height={70}
                  source={{
                    uri: `${env.APP_URL}/image/${
                      match.images.find(img => img.is_profile)?.id
                    }`,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  width={500}
                  height={500}
                  source={defaultUser}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
            </View>

            <LargeText style={{ flex: 0.8, color: colors.black }}>
              {match.name}
            </LargeText>
            <Icon
              onPress={() => {
                openWhatsapp(match.phone);
              }}
              name="whatsapp"
              color={colors.lime}
              size={sizes.icon.large}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    height: '15%',
    padding: sizes.padding.s10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});

export default MatchesScreen;
