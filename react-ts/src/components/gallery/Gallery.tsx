import { GalleryPage } from '../../util/enums';
import {
  PokemonListItemResponseData,
  PokemonSpeciesResponseData,
} from '../../util/interfaces';
import SmallCardSkeleton from '../skeletons/SmallCardSkeleton';
import SmallCard from '../small-card/SmallCard';
import './gallery.css';
import { Component } from 'react';

class Gallery extends Component {
  state = {
    isLoading: true,
    pokemonCards: [],
  };
  componentDidMount() {
    fetch(
      `https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=${GalleryPage.itemCount}`
    )
      .then((response) => response.json())
      .then((data) => {
        const pokemonURLs = data.results.map(
          (pokemon: PokemonListItemResponseData) => pokemon.url
        );

        const pokemonPromises = pokemonURLs.map((url: string) =>
          fetch(url).then((response) => response.json())
        );

        Promise.all(pokemonPromises)
          .then((pokemonData) => {
            const pokemonCards = pokemonData.map(
              (pokemon: PokemonSpeciesResponseData) => (
                <SmallCard
                  key={pokemon.id}
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
            this.setState({
              pokemonCards: pokemonCards,
            });
          })
          .catch((error) => {
            console.error(
              'An error occured while fetching the pokemon data:',
              error
            );
          })
          .finally(() => {
            this.setState({ isLoading: false });
          });
      });
  }
  render() {
    const pageSize = GalleryPage.itemCount;
    return (
      <div className="gallery">
        <h2 className="gallery__header">Pokemon Collection</h2>
        <div className="gallery__page">
          {this.state.isLoading
            ? [...Array(pageSize)].map((_, index) => (
                <SmallCardSkeleton key={index} />
              ))
            : this.state.pokemonCards}
        </div>
      </div>
    );
  }
}

export default Gallery;
