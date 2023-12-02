import { useFormContext } from 'react-hook-form';

export interface RadioButtonProps {
  id: string;
  label: string;
  type: string;
  name: string;
  options: string[];
  error?: string;
}

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
        <label>{label}</label>
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