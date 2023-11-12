import { Mock } from 'vitest';
import { Api } from '../util/enums';
import pokemonListItems from './mockData/pokemonListItems.json';
import pokemonDetails from './mockData/pokemonDetails.json';
import pokemonItem from './mockData/pokemonItem.json';

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    let responseData = {};

    if (url.includes(`${Api.baseUrl}${Api.pokemonEndpoint}`)) {
      responseData = pokemonDetails;
    } else if (
      new RegExp(`^${Api.baseUrl}${Api.speciesEndpoint}\\d+\\/$`).test(url)
    ) {
      const parts = url.split('/');
      const pokemonId = parts[parts.length - 2];
      pokemonItem.id = pokemonId;
      responseData = JSON.parse(JSON.stringify(pokemonItem));
    } else if (new RegExp(`^${Api.baseUrl}${Api.speciesEndpoint}`).test(url)) {
      responseData = pokemonListItems;
    }

    return Promise.resolve({
      json: () => Promise.resolve(responseData),
    });
  }) as Mock;
});

afterEach(() => {
  vi.restoreAllMocks();
});
