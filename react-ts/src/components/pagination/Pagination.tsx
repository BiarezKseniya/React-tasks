import { useDispatch, useSelector } from 'react-redux';
import { PaginationProps } from '../../util/interfaces';
import styles from '@/components/pagination/Pagination.module.css';
import PaginationButton from './PaginationButton';
import { RootState } from '../../store/store';
import { setCurrentPage } from '../../store/slices/pageSlice';

const Pagination = ({ totalResults }: PaginationProps) => {
  const dispatch = useDispatch();
  const pageLimit = useSelector((state: RootState) => state.page.pageLimit);
  const currentPage = useSelector((state: RootState) => state.page.currentPage);

  const totalPages = Math.ceil(totalResults / pageLimit);
  const handleStartClick = () => dispatch(setCurrentPage(1));
  const handlePrevClick = () =>
    dispatch(setCurrentPage(Math.max(currentPage - 1, 1)));
  const handleNextClick = () =>
    dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)));
  const handleEndClick = () => dispatch(setCurrentPage(totalPages));

  return (
    <div className={styles['pagination']}>
      <PaginationButton
        to={`/?page=1`}
        onClick={handleStartClick}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </PaginationButton>
      <PaginationButton
        to={`/?page=${currentPage - 1}`}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        &lt;
      </PaginationButton>
      <span className={styles['pagination__current-page']}>{currentPage}</span>
      <PaginationButton
        to={`/?page=${currentPage + 1}`}
        onClick={handleNextClick}
        disabled={currentPage >= totalPages}
      >
        &gt;
      </PaginationButton>
      <PaginationButton
        to={`/?page=${totalPages}`}
        onClick={handleEndClick}
        disabled={currentPage >= totalPages}
      >
        &gt;&gt;
      </PaginationButton>
    </div>
  );
};

export default Pagination;
