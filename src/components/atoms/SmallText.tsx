import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native';
import colors from '../../config/colors';
import { SmallTextTypography } from '../../config/typography';

type SmallTextProps = TextProps;

const SmallText: React.FC<SmallTextProps> = ({ children, style, ...props }) => {
  return (
    <Text
      style={{
        ...SmallTextTypography,
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

export default SmallText;
