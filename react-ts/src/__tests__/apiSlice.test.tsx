import { renderHook, waitFor } from '@testing-library/react';
import {
  useFetchPokemonDetailsQuery,
  useFetchPokemonListQuery,
  useFetchPokemonSearchQuery,
} from '../store/slices/apiSlice';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ReactNode } from 'react';
import { server } from './setup';
import { Api } from '../util/enums';
import { HttpResponse, delay, http } from 'msw';
import { FetchError } from '../util/types';

describe('Pokemon API tests', () => {
  let numberOfCalls = 0;
  const requestURLs: string[] = [];

  server.events.on('request:start', ({ request }) => {
    requestURLs.push(request.url);
    numberOfCalls++;
  });

  function Wrapper(props: { children: ReactNode }) {
    return <Provider store={store}>{props.children}</Provider>;
  }

  beforeEach(() => {
    numberOfCalls = 0;
    requestURLs.length = 0;
  });

  test('renders fetchPokemonList hook', async () => {
    const args = {
      offset: 0,
      limit: 10,
    };
    const { result } = renderHook(
      () =>
        useFetchPokemonListQuery({ offset: args.offset, limit: args.limit }),
      {
        wrapper: Wrapper,
      }
    );

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'fetchPokemonList',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => {
      expect(result.current).toMatchObject({
        status: 'fulfilled',
        endpointName: 'fetchPokemonList',
        data: {},
        isLoading: false,
        isSuccess: true,
        isError: false,
        currentData: {},
        isFetching: false,
      });
    });

    expect(numberOfCalls).toBe(1 + args.limit);
    expect(requestURLs[0]).toBe(
      `${Api.baseUrl}${Api.speciesEndpoint}?offset=${args.offset}&limit=${args.limit}`
    );
  });

  test('renders fetchPokemonSearch hook', async () => {
    const searchValue = 'pikachu';
    const { result } = renderHook(
      () => useFetchPokemonSearchQuery(searchValue),
      {
        wrapper: Wrapper,
      }
    );

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'fetchPokemonSearch',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => {
      expect(result.current).toMatchObject({
        status: 'fulfilled',
        endpointName: 'fetchPokemonSearch',
        data: {},
        isLoading: false,
        isSuccess: true,
        isError: false,
        currentData: {},
        isFetching: false,
      });
    });

    expect(numberOfCalls).toBe(1);
    expect(requestURLs[0]).toBe(
      `${Api.baseUrl}${Api.speciesEndpoint}${searchValue}`
    );
  });

  test('renders fetchPokemonDetails hook', async () => {
    const searchValue = '25';
    const { result } = renderHook(() => useFetchPokemonDetailsQuery('25'), {
      wrapper: Wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'fetchPokemonDetails',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => {
      expect(result.current).toMatchObject({
        status: 'fulfilled',
        endpointName: 'fetchPokemonDetails',
        data: {},
        isLoading: false,
        isSuccess: true,
        isError: false,
        currentData: {},
        isFetching: false,
      });
    });

    expect(numberOfCalls).toBe(1);
    expect(requestURLs[0]).toBe(
      `${Api.baseUrl}${Api.pokemonEndpoint}${searchValue}/`
    );
  });

  test('handles error response for fetchPokemonList', async () => {
    server.use(
      http.get(`${Api.baseUrl}${Api.speciesEndpoint}`, async () => {
        await delay(150);
        return HttpResponse.error();
      })
    );
    const { result } = renderHook(
      () => useFetchPokemonListQuery({ offset: 0, limit: 10 }),
      {
        wrapper: Wrapper,
      }
    );

    await waitFor(() => {
      expect((result.current.error as FetchError)?.error).toEqual(
        'An error occurred while fetching the pokemon list'
      );
    });
  });

  test('handles error response for fetchPokemonSearch', async () => {
    server.use(
      http.get(`${Api.baseUrl}${Api.speciesEndpoint}:id`, async () => {
        await delay(150);
        return HttpResponse.error();
      })
    );
    const searchValue = 'pikachu';
    const { result } = renderHook(
      () => useFetchPokemonSearchQuery(searchValue),
      {
        wrapper: Wrapper,
      }
    );

    await waitFor(() => {
      expect((result.current.error as FetchError)?.error).toEqual(
        'An error occurred while fetching the pokemon search'
      );
    });
  });

  test('handles not found error response for fetchPokemonSearch', async () => {
    server.use(
      http.get(`${Api.baseUrl}${Api.speciesEndpoint}:id`, async () => {
        await delay(150);
        return new HttpResponse('Not Found', { status: 404 });
      })
    );
    const searchValue = 'pikachu';
    const { result } = renderHook(
      () => useFetchPokemonSearchQuery(searchValue),
      {
        wrapper: Wrapper,
      }
    );

    await waitFor(() => {
      expect((result.current.error as FetchError)?.error).toEqual(
        `Unfortunately, there is no result for your search "${searchValue}". Try other search!`
      );
    });
  });

  test('handles server error for fetchPokemonDetails', async () => {
    server.use(
      http.get(`${Api.baseUrl}${Api.pokemonEndpoint}:id`, async () => {
        await delay(150);
        return new HttpResponse('Server Error', {
          status: 500,
          headers: {
            'Content-Type': 'text/plain',
          },
        });
      })
    );
    const { result } = renderHook(() => useFetchPokemonDetailsQuery('25'), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.error).toEqual(
        'An error occurred while fetching the pokemon details'
      );
    });
  });
});
