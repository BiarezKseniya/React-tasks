import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Api } from '../../util/enums';
import {
  PokemonListItemResponseData,
  PokemonListResponseData,
  PokemonPageData,
} from '../../util/interfaces';
import { FetchError, FetchPokemonListArgs } from '../../util/types';
import { HYDRATE } from 'next-redux-wrapper';

const createFetchError = (message: string): FetchError => ({
  status: 'FETCH_ERROR',
  error: message,
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: Api.baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    fetchPokemonList: builder.query({
      async queryFn(arg: FetchPokemonListArgs, api, extraOptions, baseQuery) {
        const pokemonListResult = await baseQuery(
          `${Api.speciesEndpoint}?offset=${arg.offset}&limit=${arg.limit}`
        );
        if (pokemonListResult.error) {
          return {
            error: createFetchError(
              'An error occurred while fetching the pokemon list'
            ),
          };
        }

        const pokemonDetailsPromises = (
          pokemonListResult.data as PokemonListResponseData
        ).results.map((pokemon: PokemonListItemResponseData) =>
          baseQuery(pokemon.url)
        );

        let pokemonDetailsResults;
        try {
          pokemonDetailsResults = await Promise.all(pokemonDetailsPromises);
        } catch (error) {
          return {
            error: createFetchError(
              'An error occurred while fetching the pokemon details'
            ),
          };
        }
        return {
          data: {
            totalResults: (pokemonListResult.data as PokemonListResponseData)
              .count,
            pokemonData: pokemonDetailsResults.map((result) => result.data),
          } as PokemonPageData,
        };
      },
    }),
    fetchPokemonSearch: builder.query({
      async queryFn(searchValue, api, extraOptions, baseQuery) {
        if (!searchValue.trim()) {
          return { data: { totalResults: 0, pokemonData: [] } };
        }
        const pokemonSearchResult = await baseQuery(
          `${Api.speciesEndpoint}${searchValue.trim().toLowerCase()}`
        );
        if (pokemonSearchResult.error) {
          if (pokemonSearchResult.error.data === 'Not Found') {
            return {
              error: createFetchError(
                `Unfortunately, there is no result for your search "${searchValue}". Try other search!`
              ),
            };
          } else {
            return {
              error: createFetchError(
                'An error occurred while fetching the pokemon search'
              ),
            };
          }
        }
        return {
          data: {
            totalResults: 1,
            pokemonData: [pokemonSearchResult.data],
          } as PokemonPageData,
        };
      },
    }),
    fetchPokemonDetails: builder.query({
      query: (pokemonId) => `${Api.pokemonEndpoint}${pokemonId}/`,
      transformErrorResponse: () => {
        return 'An error occurred while fetching the pokemon details';
      },
    }),
  }),
});

export const {
  useFetchPokemonListQuery,
  useFetchPokemonSearchQuery,
  useFetchPokemonDetailsQuery,
  util: { getRunningQueriesThunk },
} = apiSlice;
