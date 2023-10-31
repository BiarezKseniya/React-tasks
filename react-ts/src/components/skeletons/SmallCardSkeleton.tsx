import Skeleton from './Skeleton';

const SmallCardSkeleton = () => {
  return (
    <div className="small-card">
      <Skeleton type="name" />
      <Skeleton type="description" />
    </div>
  );
};

export default SmallCardSkeleton;
