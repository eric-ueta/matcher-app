import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from 'react-native';
import colors from '../../config/colors';
import { sizes } from '../../config/sizes';
import { TextButtonTypography } from '../../config/typography';

type ButtonProps = {
  title: string;
  style?: StyleProp<PressableProps['style']>;
  color?: string;
  titleColor?: string;
  disabled?: boolean;
  isLoading?: boolean;
  refreshColor?: string;
} & PressableProps;

const Button: React.FC<ButtonProps> = props => {
  const [opacityValue, setOpacityValue] = useState(1);

  return (
    <Pressable
      {...props}
      style={{
        ...styles.container,
        opacity: opacityValue,
        backgroundColor: colors.button.background,
        ...(props.style as Object),
      }}
      disabled={props.disabled ?? false}
      onPressIn={() => setOpacityValue(0.3)}
      onPressOut={() => setOpacityValue(1)}>
      {props.isLoading ? (
        <ActivityIndicator
          size="large"
          color={props.refreshColor ?? colors.primary}
        />
      ) : (
        <Text
          style={[
            TextButtonTypography,
            styles.title,
            { color: props.titleColor ?? colors.button.text },
          ]}>
          {props.title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    minHeight: sizes.button.minHeight,
    minWidth: sizes.button.minWidth,
    borderRadius: sizes.button.borderRadius,
    marginTop: sizes.button.margin,
  },
  title: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default Button;
