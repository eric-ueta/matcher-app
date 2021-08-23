export type ILoginFormData = {
  email: string;
  password: string;
};

export type IUserFormData = {
  email: string;
  name: string;
  password: string;
  phone: string;
  birth: Date;
  cityId: string;
  gender: string;
};

export type IPreferencesFormData = {
  about: string;
  minimumAge: number;
  maximumAge: number;
  gender: string;
  interestIds: Array<number>;
};
