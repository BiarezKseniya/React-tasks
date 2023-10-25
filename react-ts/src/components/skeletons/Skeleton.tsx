import './Skeleton.css';
import { Component } from 'react';

type SkeletonProps = {
  type: string;
};

class Skeleton extends Component<SkeletonProps> {
  state = {
    classes: `skeleton ${this.props.type}`,
  };
  render() {
    return <div className={this.state.classes}></div>;
  }
}

export default Skeleton;
