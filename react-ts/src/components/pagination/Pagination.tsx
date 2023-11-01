import { PaginationProps } from '../../util/interfaces';
import './Pagination.css';

const Pagination = ({
  totalResults,
  offset,
  limit,
  setOffset,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalResults / limit);

  const handleStartClick = () => setOffset(0);
  const handlePrevClick = () => setOffset(Math.max(offset - limit, 0));
  const handleNextClick = () =>
    setOffset(Math.min(offset + limit, (totalPages - 1) * limit));
  const handleEndClick = () => setOffset((totalPages - 1) * limit);

  return (
    <div className="pagination">
      <button
        className="pagination__start-button"
        onClick={handleStartClick}
        disabled={offset === 0}
      >
        &lt;&lt;
      </button>
      <button
        className="pagination__prev-button"
        onClick={handlePrevClick}
        disabled={offset === 0}
      >
        &lt;
      </button>
      <button className="pagination__current-page">{offset / limit + 1}</button>
      <button
        className="pagination__next-button"
        onClick={handleNextClick}
        disabled={offset + limit >= totalResults}
      >
        &gt;
      </button>
      <button
        className="pagination__end-button"
        onClick={handleEndClick}
        disabled={offset + limit >= totalResults}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
