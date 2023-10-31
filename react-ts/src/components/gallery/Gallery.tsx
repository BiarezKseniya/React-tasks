import { fetchPokemonSearch, fetchPokemonList } from '../../services/api';
import { GalleryPage } from '../../util/enums';
import { PokemonSpeciesResponseData } from '../../util/interfaces';
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
    const fetchData = async () => {
      setIsLoading(true);
      setError({ message: '' });
      try {
        const searchValue = localStorage.getItem('searchValue');
        let data;
        if (searchValue) {
          data = await fetchPokemonSearch(searchValue);
        } else {
          data = await fetchPokemonList();
        }
        if (data) {
          setPokemonCardsContent(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError({ message: error.message });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
