import { SmallCardProps } from '../../util/interfaces';
import './SmallCard.css';

const SmallCard = ({ name, description }: SmallCardProps) => {
  return (
    <div className="small-card">
      <div className="small-card__name">{name}</div>
      <div className="small-card__description">{description}</div>
    </div>
  );
};

export default SmallCard;
