import { fireEvent, render, screen } from '@testing-library/react';
import SmallCard from '../components/small-card/SmallCard';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from '../components/context/AppState';

test('renders the relevant card data', () => {
  render(
    <Router>
      <AppProvider>
        <SmallCard id={1} name="Sample Name" description="Sample Description" />
      </AppProvider>
    </Router>
  );
  const name = screen.getByText('Sample Name');
  const description = screen.getByText('Sample Description');

  expect(name).toBeDefined();
  expect(description).toBeDefined();
});

test('opens detailed card modal', async () => {
  const { getByText } = render(
    <Router>
      <AppProvider>
        <SmallCard id={1} name="Test" description="Test description" />
      </AppProvider>
    </Router>
  );

  fireEvent.click(getByText('Test'));
  expect(window.location.pathname + window.location.search).toBe(
    '/modal?pokemon=1'
  );
});
