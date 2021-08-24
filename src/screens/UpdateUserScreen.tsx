import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import { sizes } from '../config/sizes';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
//@ts-ignore
import defaultUser from '../assets/icons/default-user.png';
import { SignUpScreenProps } from '../@types/navigation';
import UpdateUserForm from '../components/organisms/UpdateUserForm';
import { User } from '../@types/user';
import userService from '../services/userService';
import env from '../../env';

const UpdateUserScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [file, setFile] = useState<Asset | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await userService.getUser();
    console.log(response);
    setUser(response);
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, res => {
      if (res?.assets?.[0]) {
        setFile(res.assets[0]);
      }
    });
  };

  const renderFileUri = () => {
    if (file) {
      return <Image source={{ uri: file.uri }} style={styles.image} />;
    } else {
      if (user?.images?.length > 0) {
        const profileId = user?.images.find(img => img.is_profile)?.id;

        return (
          <Image
            source={{ uri: `${env.APP_URL}/image/${profileId}` }}
            style={styles.image}
          />
        );
      } else {
        return <Image source={defaultUser} style={styles.image} />;
      }
    }
  };

  const onSubmitSuccess = () => {
    navigation.replace('Preferences');
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
      {user && (
        <UpdateUserForm
          user={user}
          imgInfo={file}
          onSuccess={onSubmitSuccess}
        />
      )}
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

export default UpdateUserScreen;
