import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import colors from '../../config/colors';

type TextErrorProps = TextProps;

const TextError: React.FC<TextErrorProps> = ({ children }) => {
  return (
    <Text style={{ ...styles.container, color: colors.error }}>
      * {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});

export default TextError;
