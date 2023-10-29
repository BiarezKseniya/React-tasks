import { Api, GalleryPage } from '../../util/enums';
import {
  PokemonListItemResponseData,
  PokemonSpeciesResponseData,
} from '../../util/interfaces';
import SmallCardSkeleton from '../skeletons/SmallCardSkeleton';
import SmallCard from '../small-card/SmallCard';
import './Gallery.css';
import { Component } from 'react';

class Gallery extends Component {
  state = {
    isLoading: true,
    pokemonCards: [],
    error: null || { message: '' },
  };

  updateGallery = () => {
    this.setState({ error: null, isLoading: true });
    const searchValue = localStorage.getItem('searchValue');
    if (searchValue) {
      fetch(
        `${Api.baseUrl}${Api.speciesEndpoint}${searchValue
          .trim()
          .toLowerCase()}/`
      )
        .then((response) => {
          if (!response.ok) {
            let error;
            if (response.status === 404) {
              error = new Error(
                `Unfortunately, there is no result for your search "${searchValue}". Try other search!`
              );
              this.setState({ error: error });
            } else {
              error = new Error(
                `API request failed with status: ${response.status}`
              );
            }
            throw error;
          }
          return response.json();
        })
        .then((pokemon: PokemonSpeciesResponseData) => {
          this.setPokemonCards([pokemon]);
        })
        .catch(() => {
          //Nothing to be done here
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else {
      fetch(
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

          Promise.all(pokemonPromises)
            .then((pokemonData) => {
              this.setPokemonCards(pokemonData);
            })
            .catch((error) => {
              console.error(
                'An error occurred while fetching the pokemon data:',
                error
              );
            })
            .finally(() => {
              this.setState({ isLoading: false });
            });
        });
    }
  };

  setPokemonCards(pokemonData: PokemonSpeciesResponseData[]) {
    const pokemonCards = pokemonData.map(
      (pokemon: PokemonSpeciesResponseData) => (
        <SmallCard
          key={pokemon.id}
          name={pokemon.name}
          description={
            pokemon.flavor_text_entries
              .find((entry) => entry.language.name === 'en')
              ?.flavor_text.replace(/\f/g, ' ') || 'No description available.'
          }
        />
      )
    );
    this.setState({
      pokemonCards: pokemonCards,
    });
  }

  componentDidMount() {
    this.updateGallery();
    window.addEventListener('searchValueChange', this.updateGallery);
  }

  componentWillUnmount() {
    window.removeEventListener('searchValueChange', this.updateGallery);
  }

  render() {
    const pageSize = this.state.pokemonCards.length || GalleryPage.itemCount;
    return (
      <div className="gallery">
        <h2 className="gallery__header">Pokemon Collection</h2>
        <div className="gallery__page">
          {this.state.error ? (
            <div className="gallery__error-message">
              {this.state.error.message}
            </div>
          ) : this.state.isLoading ? (
            [...Array(pageSize)].map((emptyElement, index) => (
              <SmallCardSkeleton key={index} />
            ))
          ) : (
            this.state.pokemonCards
          )}
        </div>
      </div>
    );
  }
}

export default Gallery;
