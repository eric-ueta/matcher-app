import { AxiosError, AxiosResponse } from 'axios';
import { Candidate } from '../@types/candidate';
import { API } from '../components/organisms/NetworkManager';

export default {
  signUp: async (
    name: string,
    email: string,
    password: string,
    phone: number,
    birth: Date,
    cityId: number,
    gender: 'm' | 'f',
  ) => {
    return API.post('/user', {
      name,
      email,
      password,
      phone,
      birth,
      cityId,
      gender,
    })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return null;
      });
  },
  updatePreferences: async (
    minimumAge: number,
    maximumAge: number,
    gender: string,
    interestIds: Array<number>,
    about: string,
  ) => {
    console.log(about);
    return API.put('/user/preference', {
      minimumAge,
      maximumAge,
      gender,
      interestIds,
      about,
    })
      .then((response: AxiosResponse) => {
        return true;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        return false;
      });
  },
  getCandidates: async (): Promise<Array<Candidate>> => {
    return API.get('/user/candidate/all')
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return [];
      });
  },
};
