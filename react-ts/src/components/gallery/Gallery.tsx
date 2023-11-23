import styles from '@/components/gallery/Gallery.module.css';
import '@/components/gallery/Gallery.module.css';
import {
  useFetchPokemonListQuery,
  useFetchPokemonSearchQuery,
} from '@/store/slices/apiSlice';
import { setCurrentPage, setIsMainLoading } from '@/store/slices/pageSlice';
import { RootState } from '@/store/store';
import { PokemonSpeciesResponseData } from '@/util/interfaces';
import { FetchError } from '@/util/types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageSizeSelect from '@/components/page-size-select/PageSizeSelect';
import SmallCard from '@/components/small-card/SmallCard';
import SmallCardSkeleton from '@/components/skeletons/SmallCardSkeleton';
import Pagination from '@/components/pagination/Pagination';
import { useRouter } from 'next/router';

const Gallery = ({ initialPage }: { initialPage?: number }) => {
  const [totalResults, setTotalResults] = useState(0);
  const [pokemonCards, setPokemonCards] = useState<JSX.Element[]>([]);

  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const pageLimit = useSelector((state: RootState) => state.page.pageLimit);
  const currentPage = useSelector((state: RootState) => state.page.currentPage);
  const isModalOpen = useSelector((state: RootState) => state.page.isModalOpen);

  const pokemonListQuery = useFetchPokemonListQuery({
    offset: (currentPage - 1) * pageLimit,
    limit: pageLimit,
  });
  const pokemonSearchQuery = useFetchPokemonSearchQuery(searchValue);

  const data = searchValue ? pokemonSearchQuery.data : pokemonListQuery.data;
  const error = searchValue ? pokemonSearchQuery.error : pokemonListQuery.error;
  const isLoading = searchValue
    ? pokemonSearchQuery.isFetching || pokemonSearchQuery.isLoading
    : pokemonListQuery.isFetching || pokemonListQuery.isLoading;

  const routerRef = useRef(useRouter());

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
      if (data.totalResults === 1) {
        dispatch(setCurrentPage(1));
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!isModalOpen) {
      routerRef.current.replace(`/page/${currentPage}`, undefined, {
        shallow: true,
      });
    }
  }, [currentPage, isModalOpen]);

  useEffect(() => {
    dispatch(setIsMainLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (initialPage) {
      dispatch(setCurrentPage(initialPage));
    }
  }, [dispatch, initialPage]);

  const loaderSize = pokemonCards.length || pageLimit;
  return (
    <div className={styles['gallery']}>
      <h2 className={styles['gallery__header']}>Pokemon Collection</h2>
      <div className={styles['gallery__results']}>
        <div>Total: {totalResults}</div>
        <PageSizeSelect />
      </div>

      <div className={styles['gallery__page']}>
        {(error || !pokemonCards.length) && !isLoading ? (
          <div className={styles['gallery__error-message']}>
            {(error as FetchError)?.error || 'No cards available.'}
          </div>
        ) : isLoading ? (
          [...Array(loaderSize)].map((emptyElement, index) => (
            <SmallCardSkeleton key={index} />
          ))
        ) : (
          <>
            {pokemonCards}
            <Pagination totalResults={totalResults} />
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
