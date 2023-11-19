import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';
import { store } from '../store/store';
import { Provider } from 'react-redux';

test('updates URL query parameter when page changes', () => {
  render(
    <Router>
      <Provider store={store}>
        <Pagination totalResults={100} />
      </Provider>
    </Router>
  );

  expect(window.location.search).toBe('');

  fireEvent.click(screen.getByText('>'));
  expect(window.location.search).toBe('?page=2');

  fireEvent.click(screen.getByText('>>'));
  expect(window.location.search).toBe('?page=10');
});
