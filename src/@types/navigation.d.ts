import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Splash: undefined;
  Auth: undefined;
  Preferences: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

export type SignUpScreenProps = {
  navigation: SignUpScreenNavigationProp;
};
