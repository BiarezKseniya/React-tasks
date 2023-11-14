import { Dispatch, ReactNode, createContext, useReducer } from 'react';
import { PokemonSpeciesResponseData, State } from '../../util/interfaces';
import SmallCard from '../small-card/SmallCard';
import { Action } from '../../util/types';

let initialState: State = {
  pokemonCards: [],
};

export const initState = () => {
  initialState = {
    pokemonCards: [],
  };
};

function reducer(state: State, action: Action) {
  switch (action.type) {
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
      return state;
  }
}

export const AppContext = createContext<{
  appState: State;
  appDispatch: Dispatch<Action>;
}>({
  appState: initialState,
  appDispatch: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appState, appDispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};
