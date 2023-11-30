import { forwardRef } from 'react';

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const { label, type, name, ...rest } = props;
    const isImageInput = type === 'file';
    return (
      <div className="form__field">
        <label
          htmlFor={name}
          className={isImageInput ? 'form__image-label' : ''}
        >
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          {...rest}
          className={isImageInput ? 'form__image-input' : ''}
        />
      </div>
    );
  }
);

export default Input;
