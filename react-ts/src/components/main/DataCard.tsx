import { useDispatch } from 'react-redux';
import { setIsNew } from '../../store/slices/formSlice';
import { useEffect, useRef } from 'react';
import { FormOutputStored } from '../../types/interfaces';

const DataCard = ({ data }: { data: FormOutputStored }) => {
  const dispatch = useDispatch();
  const isNewRef = useRef(data.isNew);
  const idRef = useRef(data.id);

  const dataArray = Object.entries(data)
    .filter(
      ([key]) =>
        key !== 'password' &&
        key !== 'confirmPassword' &&
        key !== 'isNew' &&
        key !== 'id'
    )
    .reverse();

  useEffect(() => {
    if (isNewRef.current) {
      setTimeout(() => {
        dispatch(setIsNew(idRef.current));
      }, 3000);
    }
  }, [dispatch]);

  return (
    <div className={`data-card ${data.isNew ? 'data-card_new' : ''}`}>
      {dataArray.map(([key, value]) => (
        <div className="data-card__field" key={key}>
          {key === 'photo' ? (
            <div className="data-card__image">
              <img src={value} alt="photo" />
            </div>
          ) : (
            <>
              <div className={`data-card__label ${key}`}>
                {key === 't&c'
                  ? 'Accept T&C'
                  : key[0].toUpperCase() + key.slice(1)}
              </div>
              <div className="data-card__value">
                {value === true ? 'Yes' : value}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default DataCard;
