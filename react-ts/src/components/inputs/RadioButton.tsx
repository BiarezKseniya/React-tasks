interface RadioButtonProps {
  label: string;
  type: string;
  name: string;
  options?: string[];
}

const RadioButton = ({ label, type, name, options }: RadioButtonProps) => {
  return (
    <div className="form__field">
      <label>{label}</label>
      <div className="form__options">
        {options?.map((option, i) => {
          const id = name + i;
          return (
            <div key={id}>
              <label htmlFor={id}>{option}</label>
              <input
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
};

export default RadioButton;
