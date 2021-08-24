import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { IUpdateUserFormData, IUserFormData } from '../../@types/forms';
import colors from '../../config/colors';
import { sizes } from '../../config/sizes';
import { useValidations } from '../../hooks/validationHook';
import userService from '../../services/userService';
import Button from '../atoms/Button';
import MediumText from '../atoms/MediumText';
import UnderlineInput from '../molecules/UnderlineInput';
import toast from '../../utils/toast';
import imageService from '../../services/imageService';
import authService from '../../services/authService';
import { Asset } from 'react-native-image-picker';
import { useEffect } from 'react';
import LargeText from '../atoms/LargeText';
import Input from '../molecules/Input';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import genderPreferences from '../../utils/genderPreferences';
import MultiSelect from 'react-native-multiple-select';
import { Interest, User } from '../../@types/user';
import interestService from '../../services/interestService';

type UpdateUserFormProps = {
  imgInfo: null | Asset;
  user: User;
  onSuccess: () => void;
};

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  imgInfo,
  user,
  onSuccess,
}) => {
  const [selectedGender, setSelectedGender] = useState(
    user.preference?.gender ?? 'x',
  );
  const phoneRef = useRef();
  const [min, setMin] = useState(user.preference.minimum_age ?? 18);
  const [max, setMax] = useState(user.preference.maximum_age ?? 80);
  const interestRef = useRef(null);
  const [selectedInterests, setSelectedInterests] = useState<Array<Interest>>(
    [],
  );
  const [availableInterests, setAvailableInterests] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const interests = await interestService.getInterests();

    setAvailableInterests(interests);
  };

  const renderTags = () => {
    if (
      interestRef &&
      interestRef.current &&
      interestRef.current.getSelectedItemsExt
    ) {
      return interestRef?.current?.getSelectedItemsExt(selectedInterests);
    }
  };

  const onDataSubmit = async (values: IUpdateUserFormData, form: any) => {
    const { email, about, gender, interestIds, maximumAge, minimumAge, phone } =
      values;

    const phoneRaw = phoneRef.current.getRawValue();

    if (!gender) {
      toast.showFail('Gênero obrigatório');
      form.setSubmitting(false);
      return;
    }

    const response = await userService.putUser(
      about,
      phone,
      gender,
      maximumAge,
      minimumAge,
      interestIds,
    );

    if (response && imgInfo) {
      const imageReponse = await imageService.postImage(imgInfo, true);

      if (imageReponse) {
        toast.showSuccess('Perfil Atualizado!');
      } else {
      }
    } else {
      toast.showSuccess('Perfil Atualizado!');
    }

    form.setSubmitting(false);
  };

  if (user) {
    return (
      <Formik
        initialValues={{
          about: user.about,
          phone: user.phone.toString(),
          gender: user.preference.gender,
          maximumAge: user.preference.maximum_age,
          minimumAge: user.preference.minimum_age,
          interestIds: user.preference.interests,
        }}
        onSubmit={onDataSubmit}>
        {({
          handleChange,
          setFieldValue,
          handleSubmit,
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
                    <MediumText style={styles.label}>{user.name}</MediumText>
                  </View>
                </View>
              </View>

              <View style={styles.inputRow}>
                <View>
                  <View style={styles.inputLabel}>
                    <MediumText style={styles.label}>{user.email}</MediumText>
                  </View>
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

              <View>
                <LargeText>Gosto de:</LargeText>
                <Picker
                  selectedValue={selectedGender}
                  dropdownIconColor={colors.secondary}
                  onValueChange={itemValue => {
                    if (itemValue != 'x') {
                      setSelectedGender(itemValue);
                      setFieldValue('gender', itemValue);
                    }
                  }}>
                  {genderPreferences.map(gender => {
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

              {availableInterests.length > 0 && (
                <ScrollView>
                  <LargeText>Interesses / Hobbies</LargeText>
                  <MultiSelect
                    hideTags
                    items={availableInterests}
                    uniqueKey="id"
                    ref={interestRef}
                    onSelectedItemsChange={selectedItems => {
                      setSelectedInterests(selectedItems);
                      setFieldValue('interestIds', selectedItems);
                    }}
                    selectedItems={selectedInterests}
                    selectText="Selecione seus interesses"
                    searchInputPlaceholderText="Procurar interesses..."
                    altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor={colors.red}
                    tagBorderColor={colors.secondary}
                    tagTextColor={colors.primary}
                    selectedItemTextColor={colors.primary}
                    selectedItemIconColor={colors.primary}
                    itemTextColor={colors.black}
                    displayKey="description"
                    searchInputStyle={{ color: colors.black }}
                    submitButtonColor={colors.primary}
                    submitButtonText="Confirmar"
                  />
                  <View>{selectedInterests.length > 0 && renderTags()}</View>
                </ScrollView>
              )}

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LargeText style={{ alignSelf: 'flex-start' }}>
                  Limite de idade:
                </LargeText>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%',
                  }}>
                  <MediumText>{min} anos</MediumText>
                  <MediumText>{max} anos</MediumText>
                </View>

                <MultiSlider
                  values={[min, max]}
                  sliderLength={280}
                  onValuesChange={(values: Array<number>) => {
                    setMin(values[0]);
                    setMax(values[1]);
                    setFieldValue('minimumAge', values[0]);
                    setFieldValue('maximumAge', values[1]);
                  }}
                  min={18}
                  max={80}
                  step={1}
                  markerStyle={{
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    backgroundColor: colors.primary,
                  }}
                  pressedMarkerStyle={{
                    height: 30,
                    width: 30,
                    borderRadius: 20,
                    backgroundColor: colors.secondary,
                  }}
                  selectedStyle={{
                    backgroundColor: colors.terciary,
                  }}
                  trackStyle={{
                    backgroundColor: colors.secondary,
                  }}
                  touchDimensions={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    slipDisplacement: 40,
                  }}
                  allowOverlap={false}
                />
              </View>

              <View>
                <LargeText>Sobre mim:</LargeText>
                <View>
                  <Input
                    value={values.about}
                    error={errors.about}
                    onChangeText={handleChange('about')}
                    multiline
                    numberOfLines={6}
                    placeholder="Algo sobre você"
                  />
                </View>
              </View>

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
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
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

export default UpdateUserForm;
