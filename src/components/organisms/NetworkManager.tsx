import React, { useContext, useEffect, useState } from 'react';

import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { AuthContext } from '../../contexts/authContext';
import toast from '../../utils/toast';
import Env from '../../../env';

// Axios default setup
export const API = axios.create();

API.defaults.timeout = 15000;
API.defaults.baseURL = Env.APP_URL;

export const NetworkManager: React.FC = props => {
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (authToken) {
      API.defaults.headers.Authorization = `Bearer ${authToken}`;
    }

    ////
    // Interceptors //

    // Request
    const requestInterceptor = API.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // Response
    const responseInterceptor = API.interceptors.response.use(
      response => {
        return response;
      },
      async (error: AxiosError) => {
        if (!error.response) {
          toast.showFail('Não foi possível se comunicar com o servidor');
          //toastError(t('attention'), t('errors:noResponse'));
        } else if (error.config.url?.endsWith('login')) {
          if (error.response?.data.message) {
            toast.showFail(error.response?.data.message);
          }
        } else if (error.config.url?.endsWith('logout')) {
          console.log(error.request);
          if (error.response.status === 401) {
            //dispatchUser(UserActions.logout());
          }
        } else if (error.config.url?.endsWith('refresh-token')) {
          return Promise.reject(error);
        } else {
          switch (error.response.status) {
            case 401: {
            }
          }

          if (error.response?.data.message) {
            toast.showFail(error.response?.data.message);
          }

          if (error.response?.data?.errors[0].message) {
            toast.showFail(error.response?.data?.errors[0].message);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      API.interceptors.request.eject(requestInterceptor);
      API.interceptors.response.eject(responseInterceptor);
    };
  }, [authToken]);

  return <>{props.children}</>;
};
