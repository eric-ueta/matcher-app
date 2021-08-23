import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import { sizes } from '../../config/sizes';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MatchesScreen from '../../screens/MatchesScreen';

const Tab = createBottomTabNavigator();

type TabName = 'Home' | 'Matches' | 'Profile';

const tabIcons = new Map<TabName, string>();
tabIcons.set('Home', 'home-outline');
tabIcons.set('Matches', 'format-list-bulleted');
tabIcons.set('Profile', 'account-outline');

const AuthTabs = () => {
  const { setAuthToken, setSignedIn } = useContext(AuthContext);

  const renderIcon = (screenName: TabName, isFocused: boolean) => {
    return (
      <Icon
        name={tabIcons.get(screenName) || ''}
        size={sizes.icon.default}
        color={isFocused ? colors.primary : colors.secondary}
      />
    );
  };

  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName="Home"
      screenOptions={props => {
        return {
          tabBarIcon: tab =>
            renderIcon(props.route.name as TabName, tab.focused),
          tabBarInactiveTintColor: colors.secondary,
          tabBarActiveTintColor: colors.primary,
        };
      }}>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Perfil',
          headerTitle: 'Seu Perfil',
          headerTintColor: colors.white,
          headerStyle: { backgroundColor: colors.secondary },
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          headerTitle: 'Radar de Interesses',
          headerTintColor: colors.white,
          headerStyle: { backgroundColor: colors.secondary },
          headerRight: () => (
            <Icon
              name="logout"
              style={{ padding: sizes.padding.s10 }}
              size={sizes.icon.default}
              color={colors.white}
              onPress={async () => {
                await AsyncStorage.removeItem('authToken');
                await AsyncStorage.removeItem('signedIn');
                setAuthToken(null);
                setSignedIn(false);
              }}
            />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Matches"
        options={{
          tabBarLabel: 'Matches',
          headerTitle: 'Seus Matches',
          headerTintColor: colors.white,
          headerStyle: { backgroundColor: colors.secondary },
        }}
        component={MatchesScreen}
      />
    </Tab.Navigator>
  );
};

export default AuthTabs;
