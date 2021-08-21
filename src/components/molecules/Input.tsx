import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import BasicInput, { BasicInputProps } from '../atoms/BasicInput';
import TextError from '../atoms/TextError';

type InputProps = BasicInputProps;

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  return (
    <>
      <BasicInput
        ref={ref}
        placeholder={props.placeholder}
        error={props.error}
        onChangeText={props.onChangeText}
        {...props}
      />
      {props.error && <TextError>{props.error}</TextError>}
    </>
  );
});

export default Input;
