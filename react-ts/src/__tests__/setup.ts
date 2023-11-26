import { Api } from '../util/enums';
import pokemonListItems from './mockData/pokemonListItems.json';
import pokemonDetails from './mockData/pokemonDetails.json';
import pokemonItem from './mockData/pokemonItem.json';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { apiSlice } from '../store/slices/apiSlice';
import { store } from '../store/store';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';

export const handlers = [
  http.get(`${Api.baseUrl}${Api.pokemonEndpoint}:id`, async () => {
    return HttpResponse.json({ ...pokemonDetails });
  }),
  http.get(`${Api.baseUrl}${Api.speciesEndpoint}:id`, async ({ params }) => {
    pokemonItem.id = +params.id;
    const responseData = JSON.parse(JSON.stringify(pokemonItem));
    return HttpResponse.json(responseData);
  }),
  http.get(`${Api.baseUrl}${Api.speciesEndpoint}`, async () => {
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
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
});

afterAll(() => server.close());
