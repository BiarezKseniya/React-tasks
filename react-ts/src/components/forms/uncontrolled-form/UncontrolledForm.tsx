import { useNavigate } from 'react-router-dom';
import { uncontrolledSchema } from '../../../utils/validationSchema';
import Input from './inputs/Input';
import RadioButton from './inputs/RadioButton';
import { FormEvent, createRef, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFormOutput } from '../../../store/slices/formSlice';
import { handleImageUpload } from '../../../utils/imageHandler';
import { formData } from '../../../utils/formData';
import { FormOutput } from '../../../types/interfaces';

interface Error {
  path: string;
  message: string;
}

type FieldsAccumulator = Record<
  string,
  React.RefObject<HTMLInputElement> | React.RefObject<HTMLInputElement>[]
>;

const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const refs = formData.reduce((acc: FieldsAccumulator, field) => {
    if (field.type === 'radio') {
      acc[field.name] = (field.options || []).map(() => createRef());
    } else {
      acc[field.name] = createRef();
    }
    return acc;
  }, {});

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formValues = Object.entries(refs)
      .reverse()
      .reduce(
        (
          acc: Record<string, string | boolean | null | FileList>,
          [id, ref]
        ) => {
          if (Array.isArray(ref)) {
            const checkedRef = ref.find((r) => r.current?.checked);
            acc[id] =
              checkedRef && checkedRef.current
                ? checkedRef.current.value
                : null;
          } else if (ref.current?.type === 'checkbox' && !acc[id]) {
            acc[id] = ref.current?.checked;
          } else if (ref.current?.type === 'file') {
            if (ref.current?.files) {
              acc[id] = ref.current?.files;
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

    uncontrolledSchema
      .validate(formValues, { abortEarly: false })
      .then(async () => {
        let base64String;
        if (formValues.photo instanceof FileList) {
          base64String = await handleImageUpload(formValues.photo[0]);
        }
        dispatch(
          addFormOutput({
            ...(formValues as unknown as FormOutput),
            photo: base64String,
            isNew: true,
            id: new Date().toISOString(),
          })
        );
        navigate('/');
      })
      .catch((err) => {
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
              key={field.name}
              options={field.options || []}
              error={errors[field.name]}
              id={field.name}
              {...field}
              ref={refs[field.name] as unknown as React.Ref<HTMLInputElement[]>}
            />
          );
        } else {
          return (
            <Input
              key={field.name}
              id={field.name}
              {...field}
              ref={refs[field.name] as React.Ref<HTMLInputElement>}
              error={errors[field.name]}
            />
          );
        }
      })}
      <button>Submit</button>
    </form>
  );
};

export default UncontrolledForm;
