import { PaginationProps } from '../../util/interfaces';
import styles from '@/components/pagination/Pagination.module.css';
import PaginationButton from './PaginationButton';

const Pagination = ({
  pageLimit,
  currentPage,
  totalResults,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalResults / pageLimit);

  return (
    <div className={styles['pagination']}>
      <PaginationButton to={`/page/1`} disabled={currentPage === 1}>
        &lt;&lt;
      </PaginationButton>
      <PaginationButton
        to={`/page/${currentPage - 1}`}
        disabled={currentPage === 1}
      >
        &lt;
      </PaginationButton>
      <span className={styles['pagination__current-page']}>{currentPage}</span>
      <PaginationButton
        to={`/page/${currentPage + 1}`}
        disabled={currentPage >= totalPages}
      >
        &gt;
      </PaginationButton>
      <PaginationButton
        to={`/page/${totalPages}`}
        disabled={currentPage >= totalPages}
      >
        &gt;&gt;
      </PaginationButton>
    </div>
  );
};

export default Pagination;
