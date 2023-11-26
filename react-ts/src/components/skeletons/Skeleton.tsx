import { SkeletonProps } from '@/util/interfaces';

const Skeleton = ({ type }: SkeletonProps) => {
  return <div className={`skeleton ${type}`}></div>;
};

export default Skeleton;
