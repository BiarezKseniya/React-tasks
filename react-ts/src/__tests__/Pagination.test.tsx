import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from '../components/context/AppState';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';

test('updates URL query parameter when page changes', () => {
  render(
    <Router>
      <AppProvider>
        <Pagination totalResults={100} limit={10} />
      </AppProvider>
    </Router>
  );

  expect(window.location.search).toBe('');

  fireEvent.click(screen.getByText('>'));
  expect(window.location.search).toBe('?page=2');

  fireEvent.click(screen.getByText('>>'));
  expect(window.location.search).toBe('?page=10');
});
