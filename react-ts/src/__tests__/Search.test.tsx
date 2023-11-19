import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../components/search/Search';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const searchValue = 'pikachu';

describe('Search component', () => {
  it('saves entered value to local storage when Search button is clicked', () => {
    render(
      <Router>
        <Provider store={store}>
          <Search />
        </Provider>
      </Router>
    );

    const input = screen.getByPlaceholderText(
      /Pokemon name or pokedex number.../
    );
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.change(input, { target: { value: searchValue } });
    fireEvent.click(searchButton);
    expect(localStorage.getItem('searchValue')).toBe(searchValue);
  });

  it('retrieves value from local storage upon mounting', async () => {
    localStorage.setItem('searchValue', searchValue);

    render(
      <Router>
        <Provider store={store}>
          <Search />
        </Provider>
      </Router>
    );

    const input = screen.getByPlaceholderText(
      /Pokemon name or pokedex number.../
    );

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe(searchValue);
    });
  });
});

afterEach(() => {
  localStorage.clear();
});
