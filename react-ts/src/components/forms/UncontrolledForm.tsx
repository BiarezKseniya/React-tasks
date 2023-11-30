import { schema } from '../../utils/validationSchema';
import Input from '../inputs/Input';
import RadioButton from '../inputs/RadioButton';
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

const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      (acc: Record<string, string | boolean | null | File>, [id, ref]) => {
        console.log('ref', ref);
        if (Array.isArray(ref)) {
          const checkedRef = ref.find((r) => r.current?.checked);
          acc[id] =
            checkedRef && checkedRef.current ? checkedRef.current.value : null;
        } else if (ref.current?.type === 'checkbox' && !acc[id]) {
          acc[id] = ref.current?.checked;
        } else if (ref.current?.type === 'file') {
          if (ref.current?.files) {
            acc[id] = ref.current?.files[0];
          } else {
            acc[id] = null;
          }
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
      });
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="form" noValidate>
      {formData.map((field) => {
        if (field.type === 'radio') {
          return (
            <RadioButton
              key={field.id}
              options={field.options || []}
              error={errors[field.id]}
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
              error={errors[field.id]}
            />
          );
        }
      })}
      <button>Submit</button>
    </form>
  );
};

export default UncontrolledForm;
