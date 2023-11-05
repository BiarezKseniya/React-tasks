import { useNavigate } from 'react-router-dom';
import { PaginationButtonProps } from '../../util/interfaces';

const PaginationButton = ({
  to,
  onClick,
  disabled,
  children,
}: PaginationButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to, { replace: true });
    onClick();
  };
  return (
    <button onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default PaginationButton;
