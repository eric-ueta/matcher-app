import { useKeyboard } from '@react-native-community/hooks';
import React, { useCallback } from 'react';
import { Image, StyleSheet, View, ImageBackground } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ILoginFormData } from '../@types/forms';
import { LoginScreenProps } from '../@types/navigation';
//@ts-ignore
import bg from '../assets/backgrounds/login_bg.png';
//@ts-ignore
import icon from '../assets/icons/matcher_img.png';
import LargeText from '../components/atoms/LargeText';
import SmallText from '../components/atoms/SmallText';
import LoginForm from '../components/organisms/LoginForm';
import { sizes } from '../config/sizes';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // const { keyboardShown } = useKeyboard();

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAwareScrollView
      keyboardDismissMode="interactive"
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.contentContainer}>
      <ImageBackground source={bg} style={styles.screen}>
        <Image source={icon} style={styles.logo} resizeMode="contain" />
        <LoginForm />
        {/* {!keyboardShown && ( */}
        <View style={styles.bottomContainer}>
          <LargeText onPress={onSignUpPress} style={styles.signUp}>
            Cadastrar-se
          </LargeText>
        </View>
        {/* )} */}
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: sizes.screen.padding,
  },
  logo: {
    flexShrink: 1,
    maxWidth: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  recoveryPassword: {
    flexShrink: 1,
    padding: '20%',
    textAlignVertical: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUp: {
    flex: 1,
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
