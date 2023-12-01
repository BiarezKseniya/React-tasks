import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { controlledSchema } from '../../../utils/validationSchema';
import '../Form.css';
import Input from './inputs/Input';
import RadioButton from './inputs/RadioButton';

interface FormOutput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: NonNullable<'M' | 'F' | undefined>;
  't&c': NonNullable<boolean | undefined>;
  photo: FileList | unknown;
  country: string;
}

type FieldErrors = {
  [key: string]: {
    message: string;
  };
};

const formData = [
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
  { label: 'Choose a photo', type: 'file', name: 'photo' },
  {
    label: 'Country:',
    type: 'text',
    name: 'country',
    placeholder: 'Enter your country',
  },
];
const ControlledForm = () => {
  const methods = useForm({
    resolver: yupResolver(controlledSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormOutput) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
        {formData.map((field) => {
          if (field.type === 'radio') {
            return (
              <RadioButton
                key={field.name}
                id={field.name}
                options={field.options || []}
                error={(errors as FieldErrors)[field.name]?.message}
                {...field}
              />
            );
          } else {
            return (
              <Input
                key={field.name}
                id={field.name}
                {...field}
                error={(errors as FieldErrors)[field.name]?.message}
              />
            );
          }
        })}
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default ControlledForm;
