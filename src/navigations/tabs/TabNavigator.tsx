import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import { sizes } from '../../config/sizes';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const AuthTabs = () => {
  const { setAuthToken } = useContext(AuthContext);

  return (
    <Tab.Navigator backBehavior="none" initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          headerRight: () => (
            <Icon
              name="logout"
              style={{ padding: sizes.padding.s10 }}
              size={sizes.icon.default}
              color={colors.primary}
              onPress={async () => {
                await AsyncStorage.removeItem('authToken');
                setAuthToken(null);
              }}
            />
          ),
        }}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

export default AuthTabs;
