import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { controlledSchema } from '../../../utils/validationSchema';
import Input from './inputs/Input';
import RadioButton from './inputs/RadioButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFormOutput } from '../../../store/slices/formSlice';
import { handleImageUpload } from '../../../utils/imageHandler';

export interface FormOutput {
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: NonNullable<'M' | 'F' | undefined>;
  't&c': NonNullable<boolean | undefined>;
  photo: FileList | unknown;
  country: string | undefined;
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
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(controlledSchema),
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async (data: FormOutput) => {
    let base64String;
    if (data.photo instanceof FileList) {
      base64String = await handleImageUpload(data.photo[0]);
    }
    dispatch(
      addFormOutput({
        ...data,
        photo: base64String,
        isNew: true,
        id: new Date().toISOString(),
      })
    );
    navigate('/');
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
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default ControlledForm;
