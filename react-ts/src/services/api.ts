import { Api, GalleryPage } from '../util/enums';
import { PokemonListItemResponseData } from '../util/interfaces';

export async function fetchPokemonList() {
  return await fetch(
    `${Api.baseUrl}${Api.speciesEndpoint}?offset=0&limit=${GalleryPage.itemCount}`
  )
    .then((response) => response.json())
    .then((data) => {
      const pokemonURLs = data.results.map(
        (pokemon: PokemonListItemResponseData) => pokemon.url
      );

      const pokemonPromises = pokemonURLs.map((url: string) =>
        fetch(url).then((response) => response.json())
      );

      return Promise.all(pokemonPromises);
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
    return [data];
  } catch (error) {
    if (notFound) {
      throw new Error(errorMessage);
    } else {
      console.log('An error occurred while fetching the pokemon data:', error);
    }
  }
}
