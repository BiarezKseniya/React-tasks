import styles from '@/components/gallery/Gallery.module.css';
import '@/components/gallery/Gallery.module.css';
import { PokemonPageData, PokemonSpeciesResponseData } from '@/util/interfaces';
import { FetchError } from '@/util/types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageSizeSelect from '@/components/page-size-select/PageSizeSelect';
import SmallCard from '@/components/small-card/SmallCard';
import Pagination from '@/components/pagination/Pagination';

interface GalleryProps {
  data: PokemonPageData;
  error?: FetchError;
  pageLimit: number;
  currentPage: number;
}
const Gallery = ({ data, error, pageLimit, currentPage }: GalleryProps) => {
  const [totalResults, setTotalResults] = useState(0);
  const [pokemonCards, setPokemonCards] = useState<JSX.Element[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const createPokemonCards = (pokemonData: PokemonSpeciesResponseData[]) => {
      const newPokemonCards = pokemonData.map(
        (pokemon: PokemonSpeciesResponseData) => (
          <SmallCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            description={
              pokemon.flavor_text_entries
                .find((entry) => entry.language.name === 'en')
                ?.flavor_text.replace(/\f/g, ' ') || 'No description available.'
            }
          />
        )
      );
      return newPokemonCards;
    };
    if (data) {
      const pokemonData: PokemonSpeciesResponseData[] = data.pokemonData;
      setPokemonCards(createPokemonCards(pokemonData));
      setTotalResults(data.totalResults);
    }
  }, [data, dispatch]);

  return (
    <div className={styles['gallery']}>
      <h2 className={styles['gallery__header']}>Pokemon Collection</h2>
      <div className={styles['gallery__results']}>
        <div>Total: {totalResults}</div>
        <PageSizeSelect pageLimit={pageLimit} />
      </div>

      <div className={styles['gallery__page']}>
        {error || !pokemonCards.length ? (
          <div className={styles['gallery__error-message']}>
            {error?.error || 'No cards available.'}
          </div>
        ) : (
          <>
            {pokemonCards}
            <Pagination currentPage={currentPage} totalResults={totalResults} />
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
