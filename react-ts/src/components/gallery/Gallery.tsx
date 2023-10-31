import { Api, GalleryPage } from '../../util/enums';
import {
  PokemonListItemResponseData,
  PokemonSpeciesResponseData,
} from '../../util/interfaces';
import SmallCardSkeleton from '../skeletons/SmallCardSkeleton';
import SmallCard from '../small-card/SmallCard';
import './Gallery.css';
import { ReactNode, useCallback, useEffect, useState } from 'react';

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonCards, setPokemonCards] = useState<ReactNode[]>([]);
  const [error, setError] = useState({ message: '' });

  const setPokemonCardsContent = (
    pokemonData: PokemonSpeciesResponseData[]
  ) => {
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
    setPokemonCards(pokemonCards);
  };

  const updateGallery = useCallback(() => {
    setIsLoading(true);
    setError({ message: '' });
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
              setError(error);
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
          setPokemonCardsContent([pokemon]);
        })
        .catch(() => {
          //Nothing to be done here
        })
        .finally(() => {
          setIsLoading(false);
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
              setPokemonCardsContent(pokemonData);
            })
            .catch((error) => {
              console.error(
                'An error occurred while fetching the pokemon data:',
                error
              );
            })
            .finally(() => {
              setIsLoading(false);
            });
        });
    }
  }, []);

  useEffect(() => {
    updateGallery();
    window.addEventListener('searchValueChange', updateGallery);

    return () => {
      window.removeEventListener('searchValueChange', updateGallery);
    };
  }, [updateGallery]);

  const pageSize = pokemonCards.length || GalleryPage.itemCount;
  return (
    <div className="gallery">
      <h2 className="gallery__header">Pokemon Collection</h2>
      <div className="gallery__page">
        {error.message ? (
          <div className="gallery__error-message">{error.message}</div>
        ) : isLoading ? (
          [...Array(pageSize)].map((emptyElement, index) => (
            <SmallCardSkeleton key={index} />
          ))
        ) : (
          pokemonCards
        )}
      </div>
    </div>
  );
};

export default Gallery;
