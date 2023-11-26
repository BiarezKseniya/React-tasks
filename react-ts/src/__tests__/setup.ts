import { Api } from '../util/enums';
import pokemonListItems from './mockData/pokemonListItems.json';
import pokemonDetails from './mockData/pokemonDetails.json';
import pokemonItem from './mockData/pokemonItem.json';
import { setupServer } from 'msw/node';
import { http, HttpResponse, delay } from 'msw';
import { apiSlice } from '../store/slices/apiSlice';
import { store } from '../store/store';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';

export const handlers = [
  http.get(`${Api.baseUrl}${Api.pokemonEndpoint}:id`, async () => {
    await delay(150);
    return HttpResponse.json({ ...pokemonDetails });
  }),
  http.get(`${Api.baseUrl}${Api.speciesEndpoint}:id`, async ({ params }) => {
    pokemonItem.id = +params.id;
    await delay(150);
    const responseData = JSON.parse(JSON.stringify(pokemonItem));
    return HttpResponse.json(responseData);
  }),
  http.get(`${Api.baseUrl}${Api.speciesEndpoint}`, async () => {
    await delay(150);
    return HttpResponse.json(pokemonListItems);
  }),
];

export const server = setupServer(...handlers);

beforeEach(() => {
  store.dispatch(apiSlice.util.resetApiState());
  vi.mock('next/router', () => require('next-router-mock'));
  mockRouter.useParser(
    createDynamicRouteParser(['/', '/pokemon/[id]', '/page/[currentPage]'])
  );
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
});

afterAll(() => server.close());
