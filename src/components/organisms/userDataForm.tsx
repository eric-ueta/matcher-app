import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import React, { useCallback, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IUserFormData } from '../../@types/forms';
import colors from '../../config/colors';
import { sizes } from '../../config/sizes';
import { useValidations } from '../../hooks/validationHook';
import DateTimePicker from '@react-native-community/datetimepicker';
import userService from '../../services/userService';
import { cities } from '../../utils/cities';
import { formatDate } from '../../utils/dateUtil';
import { states } from '../../utils/states';
import Button from '../atoms/Button';
import MediumText from '../atoms/MediumText';
import SmallText from '../atoms/SmallText';
import UnderlineInput from '../molecules/UnderlineInput';
import gender from '../../utils/genders';
import genders from '../../utils/genders';
import toast from '../../utils/toast';
import imageService from '../../services/imageService';
import authService from '../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Asset } from 'react-native-image-picker';
import { subYears } from 'date-fns';
import { useEffect } from 'react';

type UserDataFormProps = {
  imgInfo: null | Asset;
  onSuccess: () => void;
};

const UserDataForm: React.FC<UserDataFormProps> = ({ imgInfo, onSuccess }) => {
  const { userDataValidation } = useValidations();
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedGender, setSelectedGender] = useState('x');
  const [show, setShow] = useState(false);
  const phoneRef = useRef();
  const { setAuthToken, setSignedIn, authToken } = useContext(AuthContext);

  const showDatePicker = () => setShow(true);

  const userFormData: IUserFormData = {
    name: '',
    phone: '',
    email: '',
    password: '',
    birth: subYears(new Date(), 18),
    cityId: '',
    gender: '',
  };

  const onDataSubmit = async (values: IUserFormData, form: any) => {
    const { email, birth, cityId, gender, name, password } = values;

    const phoneRaw = phoneRef.current.getRawValue();

    if (!imgInfo) {
      toast.showFail('Imagem obrigatória');
      form.setSubmitting(false);
      return;
    }

    if (!gender) {
      toast.showFail('Gênero obrigatório');
      form.setSubmitting(false);
      return;
    }

    if (!cityId) {
      toast.showFail('Cidade obrigatória');
      form.setSubmitting(false);
      return;
    }

    const response = await userService.signUp(
      name,
      email,
      password,
      phoneRaw,
      birth,
      cityId as unknown as number,
      gender,
    );

    if (response) {
      const login = await authService.login(email, password);

      if (login) {
        // AsyncStorage.setItem('authToken', login.token);
        setAuthToken(login.token);

        const imageReponse = await imageService.postImage(
          imgInfo,
          true,
          login.token,
        );

        if (imageReponse) {
          onSuccess();
        } else {
          console.log('deu n');
        }
      }
    }

    form.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={userFormData}
      validationSchema={userDataValidation}
      onSubmit={onDataSubmit}>
      {({
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        validateForm,
        isValid,
        values,
        errors,
        isSubmitting,
        isValidating,
      }) => {
        return (
          <ScrollView contentContainerStyle={styles.formContainer}>
            <View style={styles.inputRow}>
              <View>
                <View style={styles.inputLabel}>
                  <MediumText style={styles.label}>Nome</MediumText>
                </View>
                <UnderlineInput
                  value={values.name}
                  maxLength={35}
                  placeholder="Nome"
                  onChangeText={handleChange('name')}
                  error={errors.name}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View>
                <View style={styles.inputLabel}>
                  <MediumText style={styles.label}>E-mail</MediumText>
                </View>
                <UnderlineInput
                  value={values.email}
                  maxLength={60}
                  autoCapitalize={'none'}
                  placeholder="E-mail"
                  onChangeText={handleChange('email')}
                  keyboardType="email-address"
                  error={errors.email}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View>
                <View style={styles.inputLabel}>
                  <MediumText style={styles.label}>Senha</MediumText>
                </View>
                <UnderlineInput
                  value={values.password}
                  maxLength={60}
                  autoCapitalize={'none'}
                  placeholder="Senha"
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  error={errors.password}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View>
                <View style={styles.inputLabel}>
                  <MediumText style={styles.label}>Celular</MediumText>
                </View>
                <UnderlineInput
                  ref={phoneRef}
                  value={values.phone}
                  phoneMask
                  placeholder="Celular"
                  onChangeText={handleChange('phone')}
                  error={errors.phone}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View>
                <View style={styles.inputLabel}>
                  <MediumText style={styles.label}>Gênero</MediumText>
                </View>
                <Picker
                  selectedValue={selectedGender}
                  dropdownIconColor={colors.secondary}
                  onValueChange={itemValue => {
                    if (itemValue != 'x') {
                      setSelectedGender(itemValue);
                      setFieldValue('gender', itemValue);
                    }
                  }}>
                  {genders.map(gender => {
                    return (
                      <Picker.Item
                        key={gender.gender}
                        color={colors.black}
                        label={gender.label}
                        value={gender.gender}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputLabel}>
                <View>
                  <MediumText style={styles.label}>
                    Data de Nascimento
                  </MediumText>
                  <SmallText style={styles.date}>
                    {formatDate(values.birth)}
                  </SmallText>
                </View>
                <Icon
                  name="calendar-month-outline"
                  size={sizes.icon.default}
                  style={styles.dateIcon}
                  color={colors.primary}
                  onPress={showDatePicker}
                />
              </View>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={values.birth}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || values.birth;
                    setShow(Platform.OS === 'ios');
                    setFieldValue('birth', currentDate);
                  }}
                />
              )}
            </View>

            <View style={styles.inputRow}>
              <View>
                <View style={styles.inputLabel}>
                  <MediumText style={styles.label}>Estado</MediumText>
                </View>
                <Picker
                  selectedValue={selectedState}
                  dropdownIconColor={colors.secondary}
                  onValueChange={itemValue => {
                    if (itemValue > 0) {
                      setSelectedCity(null);
                      setSelectedState(itemValue);
                    }
                  }}>
                  {states.map(state => {
                    return (
                      <Picker.Item
                        key={state.code}
                        color={colors.black}
                        label={state.code}
                        value={state.id}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>

            {selectedState && (
              <View style={styles.inputRow}>
                <View>
                  <View style={styles.inputLabel}>
                    <MediumText style={styles.label}>Cidade</MediumText>
                  </View>
                  <Picker
                    selectedValue={selectedCity}
                    onValueChange={itemValue => {
                      if (itemValue != null && itemValue > 0) {
                        setSelectedCity(itemValue);
                        setFieldValue('cityId', itemValue);
                      }
                    }}>
                    {cities.map(city => {
                      if (!selectedCity) {
                        if (city.state_id === selectedState || city.id === 0) {
                          return (
                            <Picker.Item
                              key={city.id}
                              color={colors.black}
                              label={city.name}
                              value={city.id}
                            />
                          );
                        }
                      } else {
                        if (city.state_id === selectedState) {
                          return (
                            <Picker.Item
                              key={city.id}
                              color={colors.black}
                              label={city.name}
                              value={city.id}
                            />
                          );
                        }
                      }
                    })}
                  </Picker>
                </View>
              </View>
            )}
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Button
                onPress={handleSubmit}
                disabled={isValidating || isSubmitting}
                isLoading={isValidating || isSubmitting}
                title="Salvar"
              />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
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

export default UserDataForm;
