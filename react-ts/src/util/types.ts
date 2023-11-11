import { Actions } from './enums';
import { PokemonSpeciesResponseData } from './interfaces';

export type Action =
  | { type: Actions.setSearchValue; value: string }
  | { type: Actions.setPokemonCards; value: PokemonSpeciesResponseData[] };
