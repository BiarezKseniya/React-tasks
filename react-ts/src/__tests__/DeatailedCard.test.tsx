import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import mockRouter from 'next-router-mock';
import ModalData from './mockData/modalData.json';
import DetailedCard from '@/components/detailed-card/DetailedCard';

const pokemonId = 5;

describe('DetailedCard', () => {
  it('displays data when fetched', async () => {
    mockRouter.push(`/pokemon/${pokemonId}`);

    render(
      <Provider store={store}>
        <DetailedCard modalData={ModalData} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('caterpie')).toBeDefined();
      expect(screen.getByText('Weight: 29')).toBeDefined();
      expect(screen.getByText('hp: 45')).toBeDefined();
    });
  });

  it('renders error', async () => {
    mockRouter.push(`/pokemon/${pokemonId}`);

    render(
      <Provider store={store}>
        <DetailedCard modalData={ModalData} modalError={'Error'} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeDefined();
    });
  });
});
