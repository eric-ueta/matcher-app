import { AxiosError, AxiosResponse } from 'axios';
import { Candidate } from '../@types/candidate';
import { User } from '../@types/user';
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
  getUser: async (): Promise<User> => {
    return API.get('/user')
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return [];
      });
  },

  putUser: async (
    about,
    phone,
    gender,
    maximumAge,
    minimumAge,
    interestIds,
  ): Promise<boolean> => {
    return API.put('/user', {
      about,
      phone,
      gender,
      maximumAge,
      minimumAge,
      interestIds,
    })
      .then((response: AxiosResponse) => {
        return true;
      })
      .catch((error: AxiosError) => {
        return false;
      });
  },
};
