import { SkeletonProps } from '../../util/interfaces';
import './Skeleton.css';
import { Component } from 'react';

class Skeleton extends Component<SkeletonProps> {
  state = {
    classes: `skeleton ${this.props.type}`,
  };
  render() {
    return <div className={this.state.classes}></div>;
  }
}

export default Skeleton;
