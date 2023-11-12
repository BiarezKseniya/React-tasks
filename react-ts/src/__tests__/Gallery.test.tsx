import { render, screen, waitFor } from '@testing-library/react';
import Gallery from '../components/gallery/Gallery';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from '../components/context/AppState';
import { Api } from '../util/enums';
import pokemonListItems from './mockData/pokemonListItems.json';
import pokemonListEmpty from './mockData/pokemonListEmpty.json';
import pokemonDetails from './mockData/pokemonDetails.json';
import pokemonItem from './mockData/pokemonItem.json';
import { Mock } from 'vitest';

global.fetch = vi.fn((url) => {
  let responseData = {};

  if (url.includes(`${Api.baseUrl}${Api.pokemonEndpoint}`)) {
    responseData = pokemonDetails;
  } else if (
    new RegExp(`^${Api.baseUrl}${Api.speciesEndpoint}\\d+\\/$`).test(url)
  ) {
    responseData = pokemonItem;
  } else if (new RegExp(`^${Api.baseUrl}${Api.speciesEndpoint}`).test(url)) {
    responseData = pokemonListItems;
  }

  return Promise.resolve({
    json: () => Promise.resolve(responseData),
  });
}) as Mock;

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

afterEach(() => {
  vi.restoreAllMocks();
});
