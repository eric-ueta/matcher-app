import React, { useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import { sizes } from '../config/sizes';
import { launchImageLibrary } from 'react-native-image-picker';
import UserDataForm from '../components/organisms/userDataForm';
//@ts-ignore
import defaultUser from '../assets/icons/default-user.png';

const SignUpScreen: React.FC = () => {
  const [fileUri, setFileUri] = useState<string | null>(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, res => {
      if (res?.assets?.[0]?.uri) {
        setFileUri(res.assets[0].uri);
      }
    });
  };

  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{ uri: fileUri }} style={styles.image} />;
    } else {
      return <Image source={defaultUser} style={styles.image} />;
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardDismissMode="interactive"
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.contentContainer}>
      <Pressable onPress={pickImage}>
        {renderFileUri()}
        <Icon
          name="pencil"
          size={sizes.icon.default}
          color={colors.primary}
          style={styles.pencil}
        />
      </Pressable>
      <UserDataForm />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    padding: sizes.padding.s10,
  },
  formContainer: {
    justifyContent: 'space-between',
  },
  label: {
    color: colors.text.gray,
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    backgroundColor: 'black',
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: colors.secondary,
    alignSelf: 'center',
  },
  pencil: { alignSelf: 'center', bottom: 15 },
  inputRow: {
    padding: 5,
    borderBottomWidth: 1,
  },
  date: {
    fontSize: 18,
  },
  dateIcon: {
    padding: sizes.padding.s16,
  },
});

export default SignUpScreen;
