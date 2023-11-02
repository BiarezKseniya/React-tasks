interface PageSizeSelectProps {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  setCurrentPage: (currentPage: number) => void;
}

const PageSizeSelect = ({
  pageSize,
  setPageSize,
  setCurrentPage,
}: PageSizeSelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="page-size">
      <label>Page size: </label>
      <select id="page-size" value={pageSize} onChange={(e) => handleChange(e)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default PageSizeSelect;
