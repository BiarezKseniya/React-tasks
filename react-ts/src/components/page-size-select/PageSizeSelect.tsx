import { useDispatch } from 'react-redux';
import styles from '@/components/page-size-select/PageSizeSelect.module.css';
import { setCurrentPage, setPageLimit } from '../../store/slices/pageSlice';
import { setCookieStore } from 'next-persist';
import { useRouter } from 'next/router';

const PageSizeSelect = ({ pageLimit }: { pageLimit: number }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const options = [5, 10, 15, 20];
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCookieStore(
      { pageLimit: ['pageLimit'] },
      { pageLimit: Number(e.target.value) }
    );
    dispatch(setPageLimit(Number(e.target.value)));
    dispatch(setCurrentPage(1));
    router.replace(`/page/1`);
  };

  return (
    <div className={styles['page-size']}>
      <label>Page size: </label>
      <select
        id={styles['page-size']}
        value={pageLimit}
        onChange={handleChange}
      >
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
