import { forwardRef } from 'react';
import Password from './Password';
import Autocomplete from './Autocomplete';
import { InputProps } from '../../../../types/interfaces';

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const { id, label, type, name, error, ...rest } = props;
    const isPassswordInput = id === 'password';
    const isCountryInput = id === 'country';

    return (
      <div className="form__field">
        <div className="form__label-wrapper">
          <label htmlFor={id}>{label}</label>
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
