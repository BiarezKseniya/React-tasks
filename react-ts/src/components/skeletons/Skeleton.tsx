import { SkeletonProps } from '../../util/interfaces';
import './Skeleton.css';

const Skeleton = ({ type }: SkeletonProps) => {
  return <div className={`skeleton ${type}`}></div>;
};

export default Skeleton;
