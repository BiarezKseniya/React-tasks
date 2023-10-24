import SearchIcon from '../icons/SearchIcon';
import './Search.css';
import { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="search">
        <input className="search__input" type="text" placeholder="Search..." />
        <SearchIcon />
      </div>
    );
  }
}

export default Header;
