import { render, screen, waitFor } from '@testing-library/react';
import Gallery from '../components/gallery/Gallery';
import { BrowserRouter as Router } from 'react-router-dom';
import { Api } from '../util/enums';
import pokemonListEmpty from './mockData/pokemonListEmpty.json';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { server } from './setup';
import { HttpResponse, delay, http } from 'msw';

export let requestUrl = '';

server.events.on('request:start', ({ request }) => {
  requestUrl = request.url;
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

describe('Gallery Component', () => {
  test('renders the specified number of cards', async () => {
    const expectedCardCount = 10;

    const { container } = render(
      <Router>
        <Provider store={store}>
          <Gallery />
        </Provider>
      </Router>
    );
    const cards = container.querySelectorAll('.small-card');

    await waitFor(() => {
      expect(requestUrl).toBe(
        `${Api.baseUrl}${Api.speciesEndpoint}?offset=0&limit=${expectedCardCount}`
      );
      expect(cards.length).toBe(expectedCardCount);
    });
  });

  test('displays an appropriate message when no cards are present', async () => {
    server.use(
      http.get(`${Api.baseUrl}${Api.speciesEndpoint}`, async () => {
        await delay(150);
        return HttpResponse.json(pokemonListEmpty);
      })
    );

    render(
      <Router>
        <Provider store={store}>
          <Gallery />
        </Provider>
      </Router>
    );

    await waitFor(() => {
      return expect(screen.getByText('No cards available.')).toBeDefined();
    });
  });
});
