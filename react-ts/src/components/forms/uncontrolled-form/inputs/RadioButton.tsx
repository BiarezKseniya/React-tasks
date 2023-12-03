import { forwardRef } from 'react';
import { RadioButtonProps } from '../../../../types/interfaces';

const RadioButton = forwardRef<HTMLInputElement[], RadioButtonProps>(
  function RadioButton(props, ref) {
    const { label, type, name, options, error } = props;
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
                  ref={Array.isArray(ref) ? ref[i] : null}
                  id={id}
                  type={type}
                  name={name}
                  value={option}
                  defaultChecked={i === 0}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default RadioButton;
