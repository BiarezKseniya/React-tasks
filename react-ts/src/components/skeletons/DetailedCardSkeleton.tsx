import Shimmer from './Shimmer';
import Skeleton from './Skeleton';

const DetailedCardSkeleton = () => {
  return (
    <div className="detailed-card skeleton-wrapper">
      <Skeleton type="detailed-card__header" />
      <Skeleton type="detailed-card__image-wrapper" />
      <div className="detailed-card__info">
        <Skeleton type="detailed-card__weight" />
        <div className="detailed-card__stats">
          {[...Array(6)].map((emptyElement, index) => (
            <Skeleton type="stats-range" key={index} />
          ))}
        </div>
      </div>
      <Shimmer />
    </div>
  );
};

export default DetailedCardSkeleton;
