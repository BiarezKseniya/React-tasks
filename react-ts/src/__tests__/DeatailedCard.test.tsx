import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../components/context/AppState';
import DetailedCard from '../components/detailed-card/DetailedCard';
import { Api } from '../util/enums';

const pokemonId = 1;

describe('DetailedCard', () => {
  it('fetches data on mount', async () => {
    render(
      <MemoryRouter
        initialEntries={[`/modal?front-page=1&pokemon=${pokemonId}`]}
      >
        <AppProvider>
          <DetailedCard />
        </AppProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${Api.baseUrl}${Api.pokemonEndpoint}${pokemonId}/`
      );
    });
  });

  it('displays loading indicator while fetching data', () => {
    const { container } = render(
      <MemoryRouter
        initialEntries={[`/modal?front-page=1&pokemon=${pokemonId}`]}
      >
        <AppProvider>
          <DetailedCard />
        </AppProvider>
      </MemoryRouter>
    );
    expect(container.querySelector('.detailed-card-skeleton')).toBeDefined();
  });

  it('displays data when fetched', async () => {
    render(
      <MemoryRouter
        initialEntries={[`/modal?front-page=1&pokemon=${pokemonId}`]}
      >
        <AppProvider>
          <DetailedCard />
        </AppProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('bulbasaur-test')).toBeDefined();
      expect(screen.getByText('Weight: 69')).toBeDefined();
      expect(screen.getByText('hp: 45')).toBeDefined();
    });
  });
});
