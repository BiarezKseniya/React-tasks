import Shimmer from './Shimmer';
import Skeleton from './Skeleton';

const SmallCardSkeleton = () => {
  return (
    <div className="small-card skeleton-wrapper">
      <Skeleton type="name" />
      <Skeleton type="description" />
      <Shimmer />
    </div>
  );
};

export default SmallCardSkeleton;
