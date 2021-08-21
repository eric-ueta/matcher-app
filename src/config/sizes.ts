import { Dimensions } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { ISizes } from '../@types/sizes';

export const sizes: ISizes = {
  screen: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    padding: scale(10),
  },
  padding: {
    s10: scale(10),
    s12: scale(12),
    s16: scale(16),
  },
  header: {
    height: Dimensions.get('window').height * 0.1,
    paddingHorizontal: 10,
  },
  button: {
    minHeight: verticalScale(40),
    minWidth: scale(100),
    margin: verticalScale(10),
    borderRadius: scale(5),
  },
  input: {
    margin: verticalScale(10),
    padding: scale(7),
  },
  icon: {
    small: 20,
    default: 30,
  },
};
