import yup from 'yup';

export const validation = yup.object().shape({
  email:      yup.string().email().required(),
  password:   yup.string().required()
});

export const fields = Object.keys(validation.fields);
