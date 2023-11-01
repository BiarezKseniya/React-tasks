import { useLocation, useNavigate } from 'react-router-dom';
import { PaginationProps } from '../../util/interfaces';
import './Pagination.css';
import PaginationButton from './PaginationButton';
import { useEffect } from 'react';

const Pagination = ({
  totalResults,
  offset,
  limit,
  setOffset,
}: PaginationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPages = Math.ceil(totalResults / limit);
  const currentPage = offset / limit + 1;

  useEffect(() => {
    if (offset === 0) {
      navigate('/?page=1');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = Number(params.get('page'));

    if (page) {
      setOffset((page - 1) * limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, limit]);

  const handleStartClick = () => setOffset(0);
  const handlePrevClick = () => setOffset(Math.max(offset - limit, 0));
  const handleNextClick = () =>
    setOffset(Math.min(offset + limit, (totalPages - 1) * limit));
  const handleEndClick = () => setOffset((totalPages - 1) * limit);

  return (
    <div className="pagination">
      <PaginationButton
        to={`/?page=1`}
        onClick={handleStartClick}
        disabled={offset === 0}
      >
        &lt;&lt;
      </PaginationButton>
      <PaginationButton
        to={`/?page=${currentPage - 1}`}
        onClick={handlePrevClick}
        disabled={offset === 0}
      >
        &lt;
      </PaginationButton>
      <span className="pagination__current-page">{offset / limit + 1}</span>
      <PaginationButton
        to={`/?page=${currentPage + 1}`}
        onClick={handleNextClick}
        disabled={offset + limit >= totalResults}
      >
        &gt;
      </PaginationButton>
      <PaginationButton
        to={`/?page=${totalPages}`}
        onClick={handleEndClick}
        disabled={offset + limit >= totalResults}
      >
        &gt;&gt;
      </PaginationButton>
    </div>
  );
};

export default Pagination;
