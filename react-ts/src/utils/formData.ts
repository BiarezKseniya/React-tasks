import { InputNames, InputTypes } from '../types/enum';

export const formData = [
  {
    label: 'Name:',
    type: InputTypes.TEXT,
    name: InputNames.NAME,
    placeholder: 'Enter your name',
  },
  { label: 'Age:', type: 'number', name: 'age' },
  {
    label: 'Email:',
    type: InputTypes.EMAIL,
    name: InputNames.EMAIL,
    placeholder: 'example@gmail.com',
  },
  { label: 'Password:', type: InputTypes.PASSWORD, name: InputNames.PASSWORD },
  {
    label: 'Repeat password:',
    type: InputTypes.PASSWORD,
    name: InputNames.CONFIRM_PASSWORD,
  },
  {
    label: 'Gender:',
    type: InputTypes.RADIO,
    name: InputNames.GENDER,
    options: ['M', 'F'],
  },
  { label: 'Accept T&C:', type: InputTypes.CHECKBOX, name: InputNames.T_C },
  { label: 'Choose a photo:', type: InputTypes.FILE, name: InputNames.PHOTO },
  {
    label: 'Country:',
    type: InputTypes.TEXT,
    name: InputNames.COUNTRY,
    placeholder: 'Enter your country',
  },
];
