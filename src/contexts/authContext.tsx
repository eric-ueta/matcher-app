import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type State = {
  authToken?: string | null;
  signedIn?: boolean;
  setAuthToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setSignedIn?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<State>({
  authToken: null,
  signedIn: false,
});

const AuthProvider: React.FC = ({ children }) => {
  const [authToken, setAuthToken] = useState<null | string>(null);
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const signedIn = await AsyncStorage.getItem('signedIn');

    if (token) {
      setAuthToken(token);
    }

    if (signedIn) {
      setSignedIn(true);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, signedIn, setSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
