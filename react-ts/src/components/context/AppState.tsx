import { Dispatch, ReactNode, createContext, useReducer } from 'react';
import { PokemonSpeciesResponseData, State } from '../../util/interfaces';
import SmallCard from '../small-card/SmallCard';
import { PageProvider } from './PageContext';
import { Action } from '../../util/types';

let initialState: State = {
  searchValue: localStorage.getItem('searchValue') || '',
  pokemonCards: [],
};

export const initState = () => {
  initialState = {
    searchValue: localStorage.getItem('searchValue') || '',
    pokemonCards: [],
  };
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'setSearchValue':
      return { ...state, searchValue: action.value };
    case 'setPokemonCards':
      const createPokemonCards = (
        pokemonData: PokemonSpeciesResponseData[]
      ) => {
        const newPokemonCards = pokemonData.map(
          (pokemon: PokemonSpeciesResponseData) => (
            <SmallCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              description={
                pokemon.flavor_text_entries
                  .find((entry) => entry.language.name === 'en')
                  ?.flavor_text.replace(/\f/g, ' ') ||
                'No description available.'
              }
            />
          )
        );
        return newPokemonCards;
      };
      const newPokemonCards = createPokemonCards(action.value);
      return { ...state, pokemonCards: newPokemonCards };
    default:
      throw new Error();
  }
}

export const AppContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <PageProvider>{children}</PageProvider>
    </AppContext.Provider>
  );
};
