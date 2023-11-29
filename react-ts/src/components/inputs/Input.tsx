interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
}

const Input = ({ label, type, name, ...rest }: InputProps) => {
  const isImageInput = type === 'file';
  return (
    <div className="form__field">
      <label htmlFor={name} className={isImageInput ? 'form__image-label' : ''}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        {...rest}
        className={isImageInput ? 'form__image-input' : ''}
      />
    </div>
  );
};

export default Input;
