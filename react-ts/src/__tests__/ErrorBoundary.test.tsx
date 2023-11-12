import { render, fireEvent, screen } from '@testing-library/react';
import ErrorButton from '../components/error-button/ErrorButton';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';

test('ErrorBoundary catches error and displays message', () => {
  render(
    <ErrorBoundary>
      <ErrorButton />
    </ErrorBoundary>
  );

  fireEvent.click(screen.getByRole('button', { name: /Get Error/i }));

  expect(
    screen.getByText(/Oops! Something went wrong. Try to reload the page./i)
  ).toBeDefined();
});
