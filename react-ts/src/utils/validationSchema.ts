import * as yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const uncontrolledShape = {
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
  password: yup
    .string()
    .matches(/[^A-Za-z0-9]/, 'At least one special character')
    .matches(/[A-Z]/, 'At least one uppercase letter (A-Z)')
    .matches(/[a-z]/, 'At least one lowercase letter (a-z)')
    .matches(/\d/, 'At least one number (0-9)')
    .min(8, 'Min 8 characters')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
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
      return (
        value &&
        (value as FileList)[0] &&
        (value as FileList)[0].size <= MAX_FILE_SIZE
      );
    })
    .test('fileFormat', 'Only JPEG and PNG', (value) => {
      return (
        value &&
        (value as FileList)[0] &&
        ['image/jpeg', 'image/png'].includes((value as FileList)[0].type)
      );
    })
    .required('Required'),
  country: yup.string().required('Required'),
};

const controlledShape = {
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
  password: yup
    .string()
    .min(8, 'Min 8 characters')
    .matches(/\d/, 'At least one number (0-9)')
    .matches(/[a-z]/, 'At least one lowercase letter (a-z)')
    .matches(/[A-Z]/, 'At least one uppercase letter (A-Z)')
    .matches(/[^A-Za-z0-9]/, 'At least one special character')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
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
      return (
        value &&
        (value as FileList)[0] &&
        (value as FileList)[0].size <= MAX_FILE_SIZE
      );
    })
    .test('fileFormat', 'Only JPEG and PNG', (value) => {
      return (
        value &&
        (value as FileList)[0] &&
        ['image/jpeg', 'image/png'].includes((value as FileList)[0].type)
      );
    })
    .required('Required'),
  country: yup.string().required('Required'),
};

console.log('uncontrolledShape', uncontrolledShape);
console.log('controlledShape', controlledShape);

export const uncontrolledSchema = yup.object().shape(uncontrolledShape);
export const controlledSchema = yup.object().shape(controlledShape);
