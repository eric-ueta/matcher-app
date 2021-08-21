import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import { RootStackParamList } from '../../@types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: true, headerTitle: 'Cadastro' }}
      />
    </Stack.Navigator>
  );
};

export { RootStack };
