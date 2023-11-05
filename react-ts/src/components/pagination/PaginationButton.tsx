import { Link } from 'react-router-dom';
import { PaginationButtonProps } from '../../util/interfaces';

const PaginationButton = ({
  to,
  onClick,
  disabled,
  children,
}: PaginationButtonProps) => (
  <Link to={to}>
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  </Link>
);

export default PaginationButton;
