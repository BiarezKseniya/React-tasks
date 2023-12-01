import zxcvbn from 'zxcvbn';
import './PasswordStrength.css';

const createPasswordLabel = (result: { score: number }) => {
  switch (result.score) {
    case 0:
      return 'weak';
    case 1:
      return 'weak';
    case 2:
      return 'fair';
    case 3:
      return 'good';
    case 4:
      return 'strong';
    default:
      return 'weak';
  }
};
const PasswordStrength = ({ password }: { password: string }) => {
  const testedResult = zxcvbn(password);
  const passwordLabel = createPasswordLabel(testedResult);

  return (
    <div className="form__password-strength">
      <progress
        className={`form__password-strength-bar ${passwordLabel}`}
        value={testedResult.score}
        max="4"
      />
      <div className="form__password-strength-label">{passwordLabel}</div>
    </div>
  );
};

export default PasswordStrength;
