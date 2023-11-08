import { Link } from 'react-router-dom';
import { SmallCardProps } from '../../util/interfaces';
import './SmallCard.css';
import { usePage } from '../context/PageContext';

const SmallCard = ({ id, name, description }: SmallCardProps) => {
  const { currentPage } = usePage();
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
