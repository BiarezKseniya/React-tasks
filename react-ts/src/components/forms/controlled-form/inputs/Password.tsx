import { useState } from 'react';
import PasswordStrength from '../../../passwordStrenght/PasswordStrength';
import { useFormContext } from 'react-hook-form';

interface PasswordProps {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
}

const Password = (props: PasswordProps) => {
  const [password, setPassword] = useState('');
  const { ...rest } = props;
  const { register } = useFormContext();
  const propsFromRegister = register(rest.id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    propsFromRegister.onChange(event);
  };

  return (
    <div className="form__input-wrapper">
      <input
        className="form__input"
        {...propsFromRegister}
        {...rest}
        onChange={handleChange}
      />
      <PasswordStrength password={password} />
    </div>
  );
};

export default Password;
