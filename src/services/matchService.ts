import { AxiosError, AxiosResponse } from 'axios';
import { API } from '../components/organisms/NetworkManager';

export default {
  postMatch: async (userId: number, like: boolean) => {
    return API.post('/match', {
      userId,
      like,
    })
      .then((response: AxiosResponse) => {
        return true;
      })
      .catch((error: AxiosError) => {
        return false;
      });
  },
  getMatches: async () => {
    return API.get('/match')
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return false;
      });
  },
};
