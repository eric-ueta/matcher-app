export type Candidate = {
  id: number;
  name: string;
  email: string;
  gender: string;
  age: number;
  phone: number;
  about: string;
  preference: {
    gender: string;
  };
  city: {
    name: string;
  };
  images: Array<UserImage>;
};

export type UserImage = {
  id: number;
  path: string;
  format: string;
  size: number;
  user_id: number;
  is_profile: boolean;
};
