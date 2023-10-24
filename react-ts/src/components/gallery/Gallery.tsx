import './gallery.css';
import { Component } from 'react';

class Gallery extends Component {
  render() {
    return (
      <div className="gallery">
        <h2 className="gallery__header">Pokemon Collection</h2>
        <div className="gallery__page">
          <div className="card">
            <div className="card__name">Name</div>
            <div className="card__description">Description</div>
          </div>
          <div className="card">
            <div className="card__name">Name</div>
            <div className="card__description">Description</div>
          </div>
          <div className="card">
            <div className="card__name">Name</div>
            <div className="card__description">Description</div>
          </div>
          <div className="card">
            <div className="card__name">Name</div>
            <div className="card__description">Description</div>
          </div>
          <div className="card">
            <div className="card__name">Name</div>
            <div className="card__description">Description</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
