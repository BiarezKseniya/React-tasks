import { render, screen, waitFor } from '@testing-library/react';
import Gallery from '../components/gallery/Gallery';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from '../components/context/AppState';
import pokemonListItems from './mockData/pokemonListItems.json';
import { Api } from '../util/enums';

global.fetch = vi
  .fn()
  .mockImplementationOnce(() => Promise.resolve(pokemonListItems))
  .mockImplementationOnce(() => Promise.resolve({}));

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
