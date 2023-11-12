import { render, screen, waitFor } from '@testing-library/react';
import Gallery from '../components/gallery/Gallery';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from '../components/context/AppState';
import { Api } from '../util/enums';
import pokemonListEmpty from './mockData/pokemonListEmpty.json';
import { Mock } from 'vitest';

describe('Gallery Component', () => {
  it('renders the specified number of cards', () => {
    const expectedCardCount = 10;

    const { container } = render(
      <Router>
        <AppProvider>
          <Gallery />
        </AppProvider>
      </Router>
    );
    const cards = container.querySelectorAll('.small-card');

    expect(global.fetch).toHaveBeenCalledWith(
      `${Api.baseUrl}${Api.speciesEndpoint}?offset=0&limit=${expectedCardCount}`
    );
    expect(cards.length).toBe(expectedCardCount);
  });

  it('displays an appropriate message when no cards are present', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(pokemonListEmpty),
      })
    ) as Mock;

    render(
      <Router>
        <AppProvider>
          <Gallery />
        </AppProvider>
      </Router>
    );

    await waitFor(() => {
      return expect(screen.getByText('No cards available.')).toBeDefined();
    });
  });
});
