import { PageSizeSelectProps } from '../../util/interfaces';
import './PageSizeSelect.css';

const PageSizeSelect = ({
  pageSize,
  setPageSize,
  setCurrentPage,
}: PageSizeSelectProps) => {
  const options = [5, 10, 15, 20];
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="page-size">
      <label>Page size: </label>
      <select id="page-size" value={pageSize} onChange={handleChange}>
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
