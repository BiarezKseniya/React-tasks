import { useLocation, useNavigate } from 'react-router-dom';
import { fetchPokemonSearch, fetchPokemonList } from '../../services/api';
import { Actions } from '../../util/enums';
import PageSizeSelect from '../page-size-select/PageSizeSelect';
import Pagination from '../pagination/Pagination';
import SmallCardSkeleton from '../skeletons/SmallCardSkeleton';
import './Gallery.css';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppState';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/slices/pageSlice';

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ message: '' });
  const [totalResults, setTotalResults] = useState(0);
  const { appState, appDispatch } = useContext(AppContext);
  const { pokemonCards } = appState;

  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const pageLimit = useSelector((state: RootState) => state.page.pageLimit);
  const currentPage = useSelector((state: RootState) => state.page.currentPage);
  const isModalOpen = useSelector((state: RootState) => state.page.isModalOpen);

  const locationRef = useRef(useLocation());
  const navigateRef = useRef(useNavigate());

  const updateGallery = useCallback(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError({ message: '' });
      try {
        let data;
        if (searchValue) {
          data = await fetchPokemonSearch(searchValue);
        } else {
          const offset = (currentPage - 1) * pageLimit;
          data = await fetchPokemonList(offset, pageLimit);
        }
        if (data) {
          appDispatch({
            type: Actions.setPokemonCards,
            value: await data.pokemonData,
          });
          if (data.totalResults === 1) {
            dispatch(setCurrentPage(1));
          }
          setTotalResults(data.totalResults);
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
  }, [searchValue, currentPage, pageLimit, appDispatch, dispatch]);

  useEffect(() => {
    updateGallery();
  }, [updateGallery]);

  useEffect(() => {
    if (!isModalOpen) {
      navigateRef.current(
        locationRef.current.pathname + `?page=${currentPage}`,
        { replace: true }
      );
    }
  }, [currentPage, isModalOpen]);

  const loaderSize = pokemonCards.length || pageLimit;
  return (
    <div className="gallery">
      <h2 className="gallery__header">Pokemon Collection</h2>
      <div className="gallery__results">
        <div>Total: {totalResults}</div>
        <PageSizeSelect />
      </div>

      <div className="gallery__page">
        {(error.message || !pokemonCards.length) && !isLoading ? (
          <div className="gallery__error-message">
            {error.message || 'No cards available.'}
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
