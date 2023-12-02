import { useSelector } from 'react-redux';
import DataCard from './DataCard';
import { RootState } from '../../store/store';
import { FormOutputStored } from '../../store/slices/formSlice';

const Main = () => {
  const formsData = useSelector((state: RootState) => state.form.formHistory);
  if (!formsData) {
    return null;
  }

  return (
    <div className="card-list">
      {formsData.map((data: FormOutputStored) => (
        <DataCard key={data.email} data={data} />
      ))}
    </div>
  );
};

export default Main;
