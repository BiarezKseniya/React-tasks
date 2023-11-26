import { render, screen, waitFor } from '@testing-library/react';
import Gallery from '../components/gallery/Gallery';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import PokemonCardsData from './mockData/pokemonCardsData.json';
import EmptyPokemonCardsData from './mockData/emptyPokemonCardsData.json';

describe('Gallery Component', () => {
  test('renders the specified number of cards', async () => {
    const expectedCardCount = 10;

    const { container } = render(
      <Provider store={store}>
        <Gallery
          currentPage={1}
          data={PokemonCardsData}
          pageLimit={expectedCardCount}
        />
      </Provider>
    );
    const cards = container.querySelectorAll('.small-card');

    await waitFor(() => {
      expect(cards.length).toBe(expectedCardCount);
    });
  });

  test('displays an appropriate message when no cards are present', async () => {
    render(
      <Provider store={store}>
        <Gallery currentPage={1} data={EmptyPokemonCardsData} pageLimit={10} />
      </Provider>
    );

    await waitFor(() => {
      return expect(screen.getByText('No cards available.')).toBeDefined();
    });
  });
});
