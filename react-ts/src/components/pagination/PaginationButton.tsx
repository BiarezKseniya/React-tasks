import { useRouter } from 'next/router';
import { PaginationButtonProps } from '../../util/interfaces';

const PaginationButton = ({
  to,
  disabled,
  children,
}: PaginationButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.replace(to);
  };
  return (
    <button onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default PaginationButton;
