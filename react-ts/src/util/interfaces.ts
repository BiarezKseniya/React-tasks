export interface PokemonListResponseData {
  results: PokemonListItemResponseData[];
}

export interface PokemonListItemResponseData {
  name: string;
  url: string;
}

export interface PokemonSpeciesResponseData {
  id: number;
  name: string;
  flavor_text_entries: Array<PokemonDescription>;
}

export interface PokemonDescription {
  flavor_text: string;
  language: {
    name: string;
  };
}
