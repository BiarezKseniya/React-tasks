import { useLocation, useNavigate } from 'react-router-dom';
import PageSizeSelect from '../page-size-select/PageSizeSelect';
import Pagination from '../pagination/Pagination';
import SmallCardSkeleton from '../skeletons/SmallCardSkeleton';
import './Gallery.css';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setIsMainLoading } from '../../store/slices/pageSlice';
import {
  useFetchPokemonListQuery,
  useFetchPokemonSearchQuery,
} from '../../store/slices/apiSlice';
import { PokemonSpeciesResponseData } from '../../util/interfaces';
import SmallCard from '../small-card/SmallCard';
import { FetchError } from '../../util/types';

const Gallery = () => {
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

  const locationRef = useRef(useLocation());
  const navigateRef = useRef(useNavigate());

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
      navigateRef.current(
        locationRef.current.pathname + `?page=${currentPage}`,
        { replace: true }
      );
    }
  }, [currentPage, isModalOpen]);

  useEffect(() => {
    dispatch(setIsMainLoading(isLoading));
  }, [isLoading, dispatch]);

  const loaderSize = pokemonCards.length || pageLimit;
  return (
    <div className="gallery">
      <h2 className="gallery__header">Pokemon Collection</h2>
      <div className="gallery__results">
        <div>Total: {totalResults}</div>
        <PageSizeSelect />
      </div>

      <div className="gallery__page">
        {(error || !pokemonCards.length) && !isLoading ? (
          <div className="gallery__error-message">
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
