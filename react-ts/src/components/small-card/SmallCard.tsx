import { SmallCardProps } from '../../util/interfaces';
import './SmallCard.css';
import { Component } from 'react';

class SmallCard extends Component<SmallCardProps> {
  render() {
    return (
      <div className="small-card">
        <div className="small-card__name">{this.props.name}</div>
        <div className="small-card__description">{this.props.description}</div>
      </div>
    );
  }
}

export default SmallCard;
