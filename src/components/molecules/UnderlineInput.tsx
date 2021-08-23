import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import colors from '../../config/colors';
import BasicInput, { BasicInputProps } from '../atoms/BasicInput';
import TextError from '../atoms/TextError';

type UnderlineInputProps = BasicInputProps & { phoneMask?: boolean };

const UnderlineInput = forwardRef<TextInput, UnderlineInputProps>(
  (props, ref) => {
    return (
      <>
        {!props.phoneMask ? (
          <BasicInput
            ref={ref}
            placeholder={props.placeholder}
            error={props.error}
            inputStyle={{ ...styles.input, ...(props.inputStyle as Object) }}
            textStyle={{ ...styles.textInput, ...(props.textStyle as Object) }}
            onChangeText={props.onChangeText}
            {...props}
          />
        ) : (
          <TextInputMask
            ref={ref}
            type={'cel-phone'}
            placeholderTextColor={colors.placeholder}
            style={{ color: colors.black, fontSize: 15 }}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            {...props}
          />
        )}
        {props.error && <TextError>{props.error}</TextError>}
      </>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.transparent,
    borderWidth: 0,
    padding: 0,
  },
  textInput: {
    color: colors.black,
  },
});

export default UnderlineInput;
