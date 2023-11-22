import { SkeletonProps } from '@/util/interfaces';
// import skeletonStyles from '@/components/skeletons/Skeleton.module.css';

const Skeleton = ({ type }: SkeletonProps) => {
  return <div className={`skeleton ${type}`}></div>;
};

export default Skeleton;
