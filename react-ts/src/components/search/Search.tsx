import SearchIcon from '../icons/SearchIcon';
import './Search.css';
import { Component } from 'react';

class Search extends Component {
  state = {
    searchValue: localStorage.getItem('searchValue') || '',
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { searchValue } = this.state;
    localStorage.setItem('searchValue', searchValue);

    const event = new CustomEvent('searchValueChange', { detail: searchValue });
    window.dispatchEvent(event);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.target.value });
  };
  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <input
          value={this.state.searchValue}
          className="search__input"
          type="text"
          placeholder="Pokemon name or pokedex number..."
          onChange={this.handleInputChange}
        />
        <SearchIcon onClick={this.handleSubmit} />
      </form>
    );
  }
}

export default Search;
