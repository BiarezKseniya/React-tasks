import Input from '../inputs/Input';
import RadioButton from '../inputs/RadioButton';
import './Form.css';

interface formData {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
}

const formData = [
  {
    id: 'name',
    label: 'Name:',
    type: 'text',
    name: 'name',
    placeholder: 'Enter your name',
  },
  { id: 'age', label: 'Age:', type: 'number', name: 'age' },
  {
    id: 'email',
    label: 'Email:',
    type: 'email',
    name: 'email',
    placeholder: 'example@gmail.com',
  },
  { id: 'password1', label: 'Password:', type: 'password', name: 'password' },
  {
    id: 'password2',
    label: 'Repeat password:',
    type: 'password',
    name: 'password',
  },
  {
    id: 'gender',
    label: 'Gender:',
    type: 'radio',
    name: 'gender',
    options: ['M', 'F'],
  },
  { id: 't&c', label: 'Accept T&C:', type: 'checkbox', name: 't&c' },
  { id: 'photo', label: 'Choose a photo', type: 'file', name: 'photo' },
  {
    id: 'country',
    label: 'Country:',
    type: 'text',
    name: 'country',
    placeholder: 'Enter your country',
  },
];

const UncontrolledForm = () => {
  return (
    <form className="form">
      {formData.map((field) => {
        if (field.type === 'radio') {
          return <RadioButton key={field.id} {...field} />;
        } else {
          return <Input key={field.id} {...field} />;
        }
      })}
      <button>Submit</button>
    </form>
  );
};

export default UncontrolledForm;
