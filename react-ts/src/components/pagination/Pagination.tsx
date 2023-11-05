import { PaginationProps } from '../../util/interfaces';
import './Pagination.css';
import PaginationButton from './PaginationButton';

const Pagination = ({
  totalResults,
  currentPage,
  limit,
  setCurrentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalResults / limit);
  const handleStartClick = () => setCurrentPage(1);
  const handlePrevClick = () => setCurrentPage(Math.max(currentPage - 1, 1));
  const handleNextClick = () =>
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  const handleEndClick = () => setCurrentPage(totalPages);

  return (
    <div className="pagination">
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
      <span className="pagination__current-page">{currentPage}</span>
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
