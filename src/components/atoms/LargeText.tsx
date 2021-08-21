import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native';
import colors from '../../config/colors';
import { LargeTextTypography } from '../../config/typography';

type LargeTextProps = TextProps;

const LargeText: React.FC<LargeTextProps> = ({ children, style, ...props }) => {
  return (
    <Text
      style={{
        ...LargeTextTypography,
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
    color: colors.text.default,
  },
});

export default LargeText;
