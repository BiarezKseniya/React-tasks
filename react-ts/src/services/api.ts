import { Api } from '../util/enums';
import { PokemonListItemResponseData } from '../util/interfaces';

export async function fetchPokemonList(offset: number, limit: number) {
  return await fetch(
    `${Api.baseUrl}${Api.speciesEndpoint}?offset=${offset}&limit=${limit}`
  )
    .then((response) => response.json())
    .then((data) => {
      const pokemonURLs = data.results.map(
        (pokemon: PokemonListItemResponseData) => pokemon.url
      );

      const pokemonPromises = pokemonURLs.map((url: string) =>
        fetch(url).then((response) => response.json())
      );

      return {
        totalResults: data.count,
        pokemonData: Promise.all(pokemonPromises),
      };
    })
    .catch((error) => {
      console.log('An error occurred while fetching the pokemon data:', error);
    });
}

export async function fetchPokemonSearch(searchValue: string) {
  let notFound = false;
  const errorMessage = `Unfortunately, there is no result for your search "${searchValue}". Try other search!`;
  try {
    const response = await fetch(
      `${Api.baseUrl}${Api.speciesEndpoint}${searchValue.trim().toLowerCase()}/`
    );
    if (!response.ok && response.status === 404) {
      notFound = true;
    }
    const data = await response.json();
    return {
      totalResults: 1,
      pokemonData: [data],
    };
  } catch (error) {
    if (notFound) {
      throw new Error(errorMessage);
    } else {
      console.log('An error occurred while fetching the pokemon data:', error);
    }
  }
}

export async function fetchPokemonDetails(pokemonId: string) {
  try {
    const response = await fetch(
      `${Api.baseUrl}${Api.pokemonEndpoint}${pokemonId}/`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('An error occurred while fetching the pokemon details:', error);
  }
}
