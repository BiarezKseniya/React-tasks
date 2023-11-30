import Input from '../inputs/Input';
import RadioButton from '../inputs/RadioButton';
import * as yup from 'yup';
import './Form.css';
import { FormEvent, createRef, useRef, useState } from 'react';

interface Error {
  path: string;
  message: string;
}

type FieldsAccumulator = Record<
  string,
  React.RefObject<HTMLInputElement> | React.RefObject<HTMLInputElement>[]
>;

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

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email().required(),
  password1: yup.string().min(8).required(),
  password2: yup.string().min(8).required(),
  gender: yup.string().required(),
  't&c': yup.mixed().oneOf([true], 'Must Accept Terms and Conditions'),
  photo: yup.mixed().required(),
  country: yup.string().required(),
});

const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState({});

  const refs = formData.reduce((acc: FieldsAccumulator, field) => {
    if (field.type === 'radio') {
      acc[field.id] = (field.options || []).map(() => createRef());
    } else {
      acc[field.id] = createRef();
    }
    return acc;
  }, {});

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formValues = Object.entries(refs).reduce(
      (acc: Record<string, string | boolean | null>, [id, ref]) => {
        console.log('ref', ref);
        if (Array.isArray(ref)) {
          const checkedRef = ref.find((r) => r.current?.checked);
          acc[id] =
            checkedRef && checkedRef.current ? checkedRef.current.value : null;
        } else if (ref.current?.type === 'checkbox' && !acc[id]) {
          acc[id] = ref.current?.checked;
        } else if (ref.current !== null) {
          acc[id] = ref.current.value;
        }
        return acc;
      },
      {}
    );
    console.log('formValues', formValues);

    schema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        console.log('Validation passed');
      })
      .catch((err) => {
        console.log('Validation failed');
        setErrors(
          err.inner.reduce((acc: Record<string, string>, current: Error) => {
            acc[current.path] = current.message;
            return acc;
          }, {})
        );
        console.log(errors);
      });
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="form">
      {formData.map((field) => {
        if (field.type === 'radio') {
          return (
            <RadioButton
              key={field.id}
              options={field.options || []}
              {...field}
              ref={refs[field.id] as unknown as React.Ref<HTMLInputElement[]>}
            />
          );
        } else {
          return (
            <Input
              key={field.id}
              {...field}
              ref={refs[field.id] as React.Ref<HTMLInputElement>}
            />
          );
        }
      })}
      <button>Submit</button>
    </form>
  );
};

export default UncontrolledForm;
