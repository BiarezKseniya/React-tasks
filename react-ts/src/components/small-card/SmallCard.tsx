import { Link } from 'react-router-dom';
import { SmallCardProps } from '../../util/interfaces';
import './SmallCard.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const SmallCard = ({ id, name, description }: SmallCardProps) => {
  const currentPage = useSelector((state: RootState) => state.page.currentPage);
  return (
    <Link
      className="small-card"
      to={`modal?front-page=1&pokemon=${id}`}
      state={{ page: currentPage }}
    >
      <div className="small-card__name">{name}</div>
      <div className="small-card__description">{description}</div>
    </Link>
  );
};

export default SmallCard;
