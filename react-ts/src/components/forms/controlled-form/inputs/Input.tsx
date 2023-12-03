import Password from './Password';
import Autocomplete from './Autocomplete';
import { useFormContext } from 'react-hook-form';
import { InputProps } from '../../../../types/interfaces';

const Input = ({ id, label, type, error, ...rest }: InputProps) => {
  const isPassswordInput = id === 'password';
  const isCountryInput = id === 'country';
  const { register } = useFormContext();

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
        <Password type={type} id={id} {...rest} />
      ) : isCountryInput ? (
        <Autocomplete type={type} id={id} {...rest} />
      ) : (
        <input
          type={type}
          id={id}
          className={'form__input'}
          {...rest}
          {...register(id)}
        />
      )}
    </div>
  );
};

export default Input;
