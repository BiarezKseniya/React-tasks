import { forwardRef } from 'react';
import Password from './Password';
import Autocomplete from './Autocomplete';

interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const { id, label, type, name, error, ...rest } = props;
    const isImageInput = type === 'file';
    const isPassswordInput = id === 'password1';
    const isCountryInput = id === 'country';

    return (
      <div className="form__field">
        <div className="form__label-wrapper">
          <label
            htmlFor={id}
            className={isImageInput ? 'form__image-label' : ''}
          >
            {label}
          </label>
          {error && (
            <div className="form__error" role="alert">
              {error}
            </div>
          )}
        </div>
        {isPassswordInput ? (
          <Password ref={ref} type={type} id={id} name={name} {...rest} />
        ) : isCountryInput ? (
          <Autocomplete ref={ref} type={type} id={id} name={name} {...rest} />
        ) : (
          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            {...rest}
            className={'form__input'}
          />
        )}
      </div>
    );
  }
);

export default Input;
