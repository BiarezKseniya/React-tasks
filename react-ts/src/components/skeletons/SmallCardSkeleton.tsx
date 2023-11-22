import Shimmer from '@/components/skeletons/Shimmer';
import Skeleton from '@/components/skeletons/Skeleton';
// import skeletonStyles from '@/components/skeletons/Skeleton.module.css';
// import smallCardStyles from '@/components/small-card/SmallCard.module.css';

const SmallCardSkeleton = () => {
  return (
    <div className={`skeleton-wrapper small-card`}>
      <Skeleton type="name" />
      <Skeleton type="description" />
      <Shimmer />
    </div>
  );
};

export default SmallCardSkeleton;
