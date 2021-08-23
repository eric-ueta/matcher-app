import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native';
import colors from '../../config/colors';
import { MediumTextTypography } from '../../config/typography';

type MediumTextTypography = TextProps;

const MediumText: React.FC<MediumTextTypography> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text
      style={{
        ...MediumTextTypography,
        ...styles.container,
        ...(style as Object),
      }}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    color: colors.black,
  },
});

export default MediumText;
