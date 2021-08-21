import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import React, { Ref, useCallback, useRef } from 'react';
import { useContext } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { FormProps, ILoginFormData } from '../../@types/forms';
import colors from '../../config/colors';
import { AuthContext } from '../../contexts/authContext';
import { useValidations } from '../../hooks/validationHook';
import authService from '../../services/authService';
import Button from '../atoms/Button';
import Input from '../molecules/Input';

const LoginForm: React.FC = () => {
  const { loginFormValidation } = useValidations();
  const emailInputRef: Ref<TextInput> = useRef(null);
  const passwordInputRef: Ref<TextInput> = useRef(null);
  const authContext = useContext(AuthContext);
  const loginFormData: ILoginFormData = { email: '', password: '' };

  const onLoginSubmit = useCallback(
    async (values: ILoginFormData, form: any) => {
      const response = await authService.login(values.email, values.password);

      if (response) {
        AsyncStorage.setItem('authToken', response.token);
        authContext.setAuthToken(response.token);
      } else {
        console.log(response);
      }

      form.setSubmitting(false);
    },
    [authContext],
  );

  return (
    <Formik
      initialValues={loginFormData}
      validationSchema={loginFormValidation}
      onSubmit={onLoginSubmit}>
      {({
        handleChange,
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
          <View style={styles.formContainer}>
            <View style={styles.fieldsContainer}>
              <Input
                ref={emailInputRef}
                value={values.email}
                autoCapitalize={'none'}
                placeholder={'E-mail'}
                iconName="email-outline"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onSubmitEditing={() => passwordInputRef?.current?.focus()}
                //onBlur={handleBlur('username')}
                inputStyle={styles.input}
                textStyle={styles.text}
                error={errors.email}
              />

              <Input
                ref={passwordInputRef}
                value={values.password}
                placeholder={'Senha'}
                iconName="lock"
                onChangeText={handleChange('password')}
                //onBlur={handleBlur('password')}
                inputStyle={styles.input}
                error={errors.password}
                textStyle={styles.text}
                secureTextEntry
                maxLength={60}
                textContentType="password"
              />
            </View>

            <Button
              title={'Entrar'}
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
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.screen.login.input.background,
    borderWidth: 2,
  },
  formContainer: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldsContainer: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  button: {
    backgroundColor: colors.screen.login.input.background,
    borderWidth: 2,
    borderColor: colors.input.border,
    minWidth: '50%',
    alignSelf: 'center',
  },
});

export default LoginForm;
