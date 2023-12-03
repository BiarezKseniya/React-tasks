import { useFormContext } from 'react-hook-form';
import { RadioButtonProps } from '../../../../types/interfaces';

const RadioButton = ({
  label,
  type,
  name,
  options,
  error,
}: RadioButtonProps) => {
  const { register } = useFormContext();

  return (
    <div className="form__field">
      <div className="form__label-wrapper">
        <legend>{label}</legend>
        <div className="form__error">{error}</div>
      </div>
      <div className="form__options">
        {options?.map((option, i) => {
          const id = name + i;
          return (
            <div key={id}>
              <label htmlFor={id}>{option}</label>
              <input
                id={id}
                type={type}
                value={option}
                defaultChecked={i === 0}
                {...register(name)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioButton;
