import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IPreferencesFormData } from '../../@types/forms';
import colors from '../../config/colors';
import interestService from '../../services/interestService';
import Button from '../atoms/Button';
import LargeText from '../atoms/LargeText';
import MediumText from '../atoms/MediumText';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import genderPreferences from '../../utils/genderPreferences';
import { Picker } from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import { ScrollView } from 'react-native-gesture-handler';
import toast from '../../utils/toast';
import userService from '../../services/userService';
import Input from '../molecules/Input';

type PreferencesFormProps = {
  onSuccess: () => void;
};

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSuccess }) => {
  const [min, setMin] = useState(18);
  const [selectedGender, setSelectedGender] = useState('x');
  const [max, setMax] = useState(80);
  const interestRef = useRef(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [availableInterests, setAvailableInterests] = useState([]);

  const preferencesFormData: IPreferencesFormData = {
    about: '',
    gender: '',
    maximumAge: 80,
    minimumAge: 18,
    interestIds: [],
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const interests = await interestService.getInterests();

    setAvailableInterests(interests);
  };

  const onDataSubmit = async (values: IPreferencesFormData, form: any) => {
    if (!values.gender) {
      toast.showFail('Por favor, escolha sua preferência de gênero');
      form.setSubmitting(false);
      return;
    }

    if (values.interestIds.length < 1) {
      toast.showFail('Por favor, selecione pelo menos 1 hobbie');
      form.setSubmitting(false);
      return;
    }

    const response = await userService.updatePreferences(
      values.minimumAge,
      values.maximumAge,
      values.gender,
      values.interestIds,
      values.about,
    );

    if (response) {
      onSuccess();
    } else {
    }

    form.setSubmitting(false);
  };

  return (
    <Formik initialValues={preferencesFormData} onSubmit={onDataSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        validateForm,
        isValid,
        values,
        errors,
        isSubmitting,
        setFieldValue,
        isValidating,
      }) => {
        return (
          <View style={styles.formContainer}>
            <View style={styles.fieldsContainer}>
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
                  <View>
                    {interestRef?.current?.getSelectedItemsExt(
                      selectedInterests,
                    )}
                  </View>
                </ScrollView>
              )}
            </View>

            <Button
              title={'Atualizar'}
              disabled={isSubmitting || isValidating}
              isLoading={isSubmitting || isValidating}
              onPress={handleSubmit}
              style={styles.button}
            />
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  fieldsContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
  },
  button: {
    minWidth: '50%',
    alignSelf: 'center',
  },
});

export default PreferencesForm;
