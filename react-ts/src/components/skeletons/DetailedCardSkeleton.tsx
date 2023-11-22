import Shimmer from '@/components/skeletons/Shimmer';
import Skeleton from '@/components/skeletons/Skeleton';
// import detailedCardStyles from '@/components/detailed-card/DetailedCard.module.css';
// import skeletonStyles from '@/components/skeletons/Skeleton.module.css';

const DetailedCardSkeleton = () => {
  return (
    <div className={`detailed-card skeleton-wrapper`}>
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
