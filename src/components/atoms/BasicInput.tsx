import React, { forwardRef } from 'react';
import {
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextInputProps,
  Pressable,
  ViewStyle,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import { sizes } from '../../config/sizes';

export type BasicInputProps = {
  style?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconName?: string;
  error?: string;
  inputStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

const invalidBorderWidth = 2;

const BasicInput = forwardRef<TextInput, BasicInputProps>((props, ref) => {
  return (
    <Pressable
      //onPress={() => console.log('input')}
      style={[
        styles.container,
        props.style,
        { color: colors.input.default },
        props.error
          ? {
              borderColor: colors.error,
              borderWidth: invalidBorderWidth,
            }
          : {
              borderColor: colors.input.border,
              borderWidth: StyleSheet.hairlineWidth,
            },
        props.inputStyle,
      ]}>
      {props.iconName && (
        <Icon
          name={props.iconName}
          size={sizes.icon.default}
          color={props.error ? colors.error : colors.primary}
        />
      )}
      <TextInput
        ref={ref}
        style={{ ...styles.textInput, ...(props.textStyle as Object) }}
        placeholderTextColor={props.error ? colors.error : colors.placeholder}
        {...props}
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: sizes.input.padding,
    marginTop: sizes.input.margin,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: sizes.button.minHeight,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: colors.black,
  },
});

export default BasicInput;
