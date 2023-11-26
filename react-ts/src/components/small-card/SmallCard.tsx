import { SmallCardProps } from '../../util/interfaces';
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '../../store/slices/pageSlice';
import Link from 'next/link';

const SmallCard = ({ id, name, description }: SmallCardProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setIsModalOpen(true));
  };

  return (
    <Link className="small-card" onClick={handleClick} href={`/pokemon/${id}`}>
      <div className="small-card__name">{name}</div>
      <div className="small-card__description">{description}</div>
    </Link>
  );
};

export default SmallCard;
