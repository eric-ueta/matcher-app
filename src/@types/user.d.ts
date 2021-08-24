export type User = {
  id: number;
  name: string;
  email: string;
  about: string;
  phone: number;
  birth: Date;
  gender: string;
  notification_token: string;
  city_id: number;
  preference_id: number;
  created_at: Date;
  updated_at: Date;
  images: [
    {
      id: number;
      path: string;
      format: string;
      size: number;
      user_id: number;
      is_profile: boolean;
    },
  ];
  preference: {
    id: number;
    minimum_age: number;
    maximum_age: number;
    gender: string;
    interests: Array<Interest>;
  };
  age: number;
};

export type Interest = {
  id: number;
  description: string;
};
