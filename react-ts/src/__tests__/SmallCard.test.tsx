import { render, screen } from '@testing-library/react';
import SmallCard from '../components/small-card/SmallCard';
import { Provider } from 'react-redux';
import { store } from '../store/store';

test('renders the relevant card data', () => {
  render(
    <Provider store={store}>
      <SmallCard id={1} name="Sample Name" description="Sample Description" />
    </Provider>
  );
  const name = screen.getByText('Sample Name');
  const description = screen.getByText('Sample Description');

  expect(name).toBeDefined();
  expect(description).toBeDefined();
});
