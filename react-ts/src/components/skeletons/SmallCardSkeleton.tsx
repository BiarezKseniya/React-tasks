import { Component } from 'react';
import Skeleton from './Skeleton';

class SmallCardSkeleton extends Component {
  render() {
    return (
      <div className="small-card">
        <Skeleton type="name" />
        <Skeleton type="description" />
      </div>
    );
  }
}

export default SmallCardSkeleton;
