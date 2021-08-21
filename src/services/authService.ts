import { AxiosError, AxiosResponse } from 'axios';
import { API } from '../components/organisms/NetworkManager';

export default {
  login: async (email: string, password: string) => {
    return API.post('/login', {
      email: email,
      password: password,
      notificationToken: 'daksokosadok',
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return null;
      });
  },
};
