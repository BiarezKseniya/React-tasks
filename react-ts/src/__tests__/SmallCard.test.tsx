import { fireEvent, render, screen } from '@testing-library/react';
import SmallCard from '../components/small-card/SmallCard';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';

test('renders the relevant card data', () => {
  render(
    <Router>
      <Provider store={store}>
        <SmallCard id={1} name="Sample Name" description="Sample Description" />
      </Provider>
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
      <Provider store={store}>
        <SmallCard id={1} name="Test" description="Test description" />
      </Provider>
    </Router>
  );

  fireEvent.click(getByText('Test'));
  expect(window.location.pathname + window.location.search).toBe(
    '/modal?pokemon=1'
  );
});
