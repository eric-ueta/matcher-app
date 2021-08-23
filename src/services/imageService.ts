import { AxiosError, AxiosResponse } from 'axios';
import { Asset } from 'react-native-image-picker';
import { API } from '../components/organisms/NetworkManager';

export default {
  postImage: async (data: Asset, isProfile: boolean, token?: string) => {
    const form = new FormData();

    console.log(token);

    form.append('image', {
      uri: data.uri,
      type: 'image/jpg',
      name: data.fileName,
    });
    form.append('isProfile', isProfile);

    const headers = !token
      ? {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        }
      : {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        };

    return API.post('/user/image', form, { headers })
      .then((response: AxiosResponse) => {
        return true;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        return null;
      });
  },
};
