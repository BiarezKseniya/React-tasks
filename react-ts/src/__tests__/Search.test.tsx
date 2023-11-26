import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/search/Search';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const searchValue = 'pikachu';

describe('Search component', () => {
  it('saves entered value to local storage when Search button is clicked', () => {
    render(
      <Provider store={store}>
        <Search searchValue="" />
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      /Pokemon name or pokedex number.../
    );
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.change(input, { target: { value: searchValue } });
    fireEvent.click(searchButton);
    expect(localStorage.getItem('searchValue')).toBe(searchValue);
  });
});

afterEach(() => {
  localStorage.clear();
});
