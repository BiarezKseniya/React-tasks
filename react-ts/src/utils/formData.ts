export const formData = [
  {
    label: 'Name:',
    type: 'text',
    name: 'name',
    placeholder: 'Enter your name',
  },
  { label: 'Age:', type: 'number', name: 'age' },
  {
    label: 'Email:',
    type: 'email',
    name: 'email',
    placeholder: 'example@gmail.com',
  },
  { label: 'Password:', type: 'password', name: 'password' },
  {
    label: 'Repeat password:',
    type: 'password',
    name: 'confirmPassword',
  },
  {
    label: 'Gender:',
    type: 'radio',
    name: 'gender',
    options: ['M', 'F'],
  },
  { label: 'Accept T&C:', type: 'checkbox', name: 't&c' },
  { label: 'Choose a photo:', type: 'file', name: 'photo' },
  {
    label: 'Country:',
    type: 'text',
    name: 'country',
    placeholder: 'Enter your country',
  },
];
