import { AxiosError, AxiosResponse } from 'axios';
import { API } from '../components/organisms/NetworkManager';

export default {
  getInterests: async () => {
    return API.get('/interest')
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return [];
      });
  },
};
