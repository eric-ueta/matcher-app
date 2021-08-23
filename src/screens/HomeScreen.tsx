import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import env from '../../env';
import { Candidate } from '../@types/candidate';
//@ts-ignore
import defaultUser from '../assets/icons/default-user.png';
import EmptyCandidates from '../components/atoms/emptyCandidates';
import MediumText from '../components/atoms/MediumText';
import SmallText from '../components/atoms/SmallText';
import colors from '../config/colors';
import { sizes } from '../config/sizes';
import matchService from '../services/matchService';
import userService from '../services/userService';

const HomeScreen: React.FC = () => {
  const [candidates, setCandidates] = useState<Array<Candidate>>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null,
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getCandidates();
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      const newCandidate = candidates[index];

      setCurrentCandidate(newCandidate);

      if (candidates[index + 1]) {
        setIndex(x => x + 1);
      } else {
        setCandidates([]);
      }
    }
  }, [candidates]);

  const getCandidates = async () => {
    const response = await userService.getCandidates();

    if (response) {
      setCandidates(response);
    }
  };

  const likeCandidate = async () => {
    console.log(currentCandidate?.id, true);
    const response = await matchService.postMatch(currentCandidate?.id, true);

    if (response) {
      const newCandidate = candidates[index];

      if (candidates[index + 1]) {
        setIndex(x => x + 1);
      } else {
        setCandidates([]);
      }

      setCurrentCandidate(newCandidate);
    }
  };
  const denyCandidate = async () => {
    console.log(currentCandidate?.id, true);
    const response = await matchService.postMatch(currentCandidate?.id, false);

    if (response) {
      const newCandidate = candidates[index];

      if (candidates[index + 1]) {
        setIndex(x => x + 1);
      } else {
        setCandidates([]);
      }

      setCurrentCandidate(newCandidate);
    }
  };

  const renderGenderPreference = () => {
    let iconName;
    let label;
    let color;
    switch (currentCandidate?.preference.gender) {
      case 'm': {
        iconName = 'gender-male';
        label = 'Homens';
        color = colors.blue;
        break;
      }
      case 'f': {
        iconName = 'gender-female';
        label = 'Mulheres';
        color = colors.terciary;
        break;
      }
      case 'o': {
        iconName = 'gender-male-female';
        label = 'Homens e Mulheres';
        color = colors.terciary;
        break;
      }
    }

    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Icon name={iconName} size={sizes.icon.small} color={color} />
        <SmallText style={styles.text}>{label}</SmallText>
      </View>
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.secondary }}
      contentContainerStyle={styles.screen}>
      {currentCandidate != null ? (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.black,
            }}>
            {currentCandidate?.images.length > 0 ? (
              <Image
                height={500}
                width={500}
                source={{
                  uri: `${env.APP_URL}/image/${currentCandidate.images[0].id}`,
                }}
                style={{ height: '100%', width: '100%', flex: 1 }}
                resizeMode="contain"
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

          <View
            style={{
              flexShrink: 1,
              backgroundColor: colors.backgroundSecondary,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: sizes.padding.s10,
            }}>
            <View
              style={{
                flex: 2,
                alignSelf: 'flex-start',
              }}>
              <MediumText style={styles.text}>
                {currentCandidate.name}
              </MediumText>
              <MediumText style={styles.text}>
                {currentCandidate.age} Anos
              </MediumText>
              <MediumText style={styles.text}>
                {currentCandidate.city.name} - PR
              </MediumText>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'flex-start',
                paddingRight: sizes.padding.s12,
              }}>
              <SmallText style={styles.text}>Interessado em:</SmallText>

              {renderGenderPreference()}
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <ScrollView>
              <MediumText style={{ ...styles.text, ...styles.aboutText }}>
                {currentCandidate.about}
              </MediumText>
            </ScrollView>
          </View>
          <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.white,
                height: sizes.icon.large,
                width: sizes.icon.large,
                borderRadius: sizes.icon.large / 2,
              }}>
              <Icon
                name="close"
                size={sizes.icon.default}
                color={colors.red}
                onPress={denyCandidate}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.white,
                height: sizes.icon.large,
                width: sizes.icon.large,
                borderRadius: sizes.icon.large / 2,
              }}>
              <Icon
                name="heart"
                size={sizes.icon.default}
                color={colors.primary}
                onPress={likeCandidate}
              />
            </View>
          </View>
        </>
      ) : (
        <EmptyCandidates />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  image: { height: '50%', flex: 1 },
  text: {
    color: colors.white,
  },
  aboutText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default HomeScreen;
