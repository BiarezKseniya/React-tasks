import * as yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase (A-Z)')
    .required('Required'),
  age: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be positive')
    .integer('Must be integer')
    .required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password1: yup
    .string()
    .matches(/[^A-Za-z0-9]/, 'At least one special character')
    .matches(/[A-Z]/, 'At least one uppercase letter (A-Z)')
    .matches(/[a-z]/, 'At least one lowercase letter (a-z)')
    .matches(/\d/, 'At least one number (0-9)')
    .min(8, 'Min 8 characters')
    .required('Required'),
  password2: yup
    .string()
    .oneOf([yup.ref('password1')], 'Passwords must match')
    .required('Required'),
  gender: yup
    .string()
    .oneOf(['M', 'F'], 'Choose a gender')
    .required('Required'),
  't&c': yup
    .bool()
    .oneOf([true], 'Must Accept Terms and Conditions')
    .required('Required'),
  photo: yup
    .mixed()
    .test('fileSize', 'Max size is 5MB', (value) => {
      return value && (value as File).size <= MAX_FILE_SIZE;
    })
    .test('fileFormat', 'Only JPEG and PNG', (value) => {
      return (
        value && ['image/jpeg', 'image/png'].includes((value as File).type)
      );
    })
    .required('Required'),
  country: yup.string().required('Required'),
});
