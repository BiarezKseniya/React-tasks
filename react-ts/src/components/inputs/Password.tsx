import { forwardRef, useState } from 'react';
import PasswordStrength from '../passwordStrenght/PasswordStrength';

interface PasswordProps {
  id: string;
  type: string;
  name: string;
  placeholder?: string;
}

const Password = forwardRef<HTMLInputElement, PasswordProps>(
  function Input(props, ref) {
    const { ...rest } = props;
    const [password, setPassword] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };

    return (
      <div className="form__input-wrapper">
        <input
          className="form__input"
          ref={ref}
          {...rest}
          onChange={(e) => handleChange(e)}
        />
        <PasswordStrength password={password} />
      </div>
    );
  }
);

export default Password;
