import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailedCard from '../components/detailed-card/DetailedCard';
import { Api } from '../util/enums';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { server } from './setup';

const pokemonId = 1;
let requestURL = '';

server.events.on('request:start', ({ request }) => {
  requestURL = request.url;
});

describe('DetailedCard', () => {
  it('fetches data on mount', async () => {
    render(
      <MemoryRouter initialEntries={[`/modal?pokemon=${pokemonId}`]}>
        <Provider store={store}>
          <DetailedCard />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(requestURL).toBe(
        `${Api.baseUrl}${Api.pokemonEndpoint}${pokemonId}/`
      );
    });
    requestURL = '';
  });

  it('displays loading indicator while fetching data', () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/modal?pokemon=${pokemonId}`]}>
        <Provider store={store}>
          <DetailedCard />
        </Provider>
      </MemoryRouter>
    );
    expect(container.querySelector('.detailed-card-skeleton')).toBeDefined();
  });

  it('displays data when fetched', async () => {
    render(
      <MemoryRouter initialEntries={[`/modal?pokemon=${pokemonId}`]}>
        <Provider store={store}>
          <DetailedCard />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('bulbasaur-test')).toBeDefined();
      expect(screen.getByText('Weight: 69')).toBeDefined();
      expect(screen.getByText('hp: 45')).toBeDefined();
    });
  });
});
