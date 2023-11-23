import { useRouter } from 'next/router';
import { PaginationButtonProps } from '../../util/interfaces';

const PaginationButton = ({
  to,
  onClick,
  disabled,
  children,
}: PaginationButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.replace(to, undefined, { shallow: true });
    onClick();
  };
  return (
    <button onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default PaginationButton;
