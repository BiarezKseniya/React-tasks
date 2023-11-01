import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface PaginationButtonProps {
  to: string;
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}

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
