import { SmallCardProps } from '../../util/interfaces';
import { useDispatch } from 'react-redux';
// import { RootState } from '../../store/store';
import { setIsModalOpen } from '../../store/slices/pageSlice';
import Link from 'next/link';
// import styles from '@/components/small-card/SmallCard.module.css';

const SmallCard = ({ id, name, description }: SmallCardProps) => {
  const dispatch = useDispatch();
  // const currentPage = useSelector((state: RootState) => state.page.currentPage);
  const handleClick = () => {
    dispatch(setIsModalOpen(true));
  };

  return (
    <Link
      className="small-card"
      onClick={handleClick}
      href={`pokemon/${id}`}
      // state={{ page: currentPage }}
    >
      <div className="small-card__name">{name}</div>
      <div className="small-card__description">{description}</div>
    </Link>
  );
};

export default SmallCard;
