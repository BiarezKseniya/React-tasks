import { FormOutputStored } from '../../store/slices/formSlice';

const DataCard = ({ data }: { data: FormOutputStored }) => {
  const dataArray = Object.entries(data)
    .filter(([key]) => key !== 'password' && key !== 'confirmPassword')
    .reverse();
  return (
    <div className="data-card">
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
