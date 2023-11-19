import { useDispatch, useSelector } from 'react-redux';
import './PageSizeSelect.css';
import { RootState } from '../../store/store';
import { setCurrentPage, setPageLimit } from '../../store/slices/pageSlice';

const PageSizeSelect = () => {
  const dispatch = useDispatch();
  const pageLimit = useSelector((state: RootState) => state.page.pageLimit);

  const options = [5, 10, 15, 20];
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPageLimit(Number(e.target.value)));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="page-size">
      <label>Page size: </label>
      <select id="page-size" value={pageLimit} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option.toString()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeSelect;
