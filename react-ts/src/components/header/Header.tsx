import Search from '../search/Search';
import './Header.css';
import { Component } from 'react';

class Header extends Component {
  state = {
    showError: false,
  };

  render() {
    if (this.state.showError) {
      throw new Error('Test error');
    }
    return (
      <header className="header">
        <div className="header__text">
          <h1 className="header__title">Pokemon Finder</h1>
          <div className="header__subtitle">Search for your Pokemon!</div>
        </div>
        <Search />
        <button
          className="header__get-error"
          onClick={() => {
            this.setState({ showError: true });
          }}
        >
          Get Error
        </button>
      </header>
    );
  }
}

export default Header;
