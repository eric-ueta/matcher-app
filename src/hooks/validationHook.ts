import * as Yup from 'yup';

export const useValidations = () => {
  const loginFormValidation = Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .required('E-mail obrigatório')
      .email('E-mail inválido'),
    password: Yup.string()
      .label('Password')
      .required('Senha obrigatória')
      .min(6, 'Mínimo 6 caracteres')
      .max(100, 'Máximo 100 caracteres'),
  });

  const userDataValidation = Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .required('E-mail obrigatório')
      .email('E-mail inválido'),
    password: Yup.string()
      .label('Password')
      .required('Senha obrigatória')
      .min(6, 'Mínimo 6 caracteres')
      .max(100, 'Máximo 100 caracteres'),
    name: Yup.string().label('Nome').required('Nome obrigatório'),
  });

  return {
    loginFormValidation,
    userDataValidation,
  };
};
