import { forwardRef } from 'react';
import Password from './Password';

interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const { id, label, type, name, ...rest } = props;
    const isImageInput = type === 'file';
    const isPassswordInput = id === 'password1';
    return (
      <div className="form__field">
        <label htmlFor={id} className={isImageInput ? 'form__image-label' : ''}>
          {label}
        </label>
        {isPassswordInput ? (
          <Password ref={ref} type={type} id={id} name={name} {...rest} />
        ) : (
          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            {...rest}
            className={isImageInput ? 'form__image-input' : ''}
          />
        )}
      </div>
    );
  }
);

export default Input;
