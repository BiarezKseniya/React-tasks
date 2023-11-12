import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchPokemonSearch, fetchPokemonList } from '../../services/api';
import { Actions, GalleryPage } from '../../util/enums';
import PageSizeSelect from '../page-size-select/PageSizeSelect';
import Pagination from '../pagination/Pagination';
import SmallCardSkeleton from '../skeletons/SmallCardSkeleton';
import './Gallery.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { usePage } from '../context/PageContext';
import { AppContext } from '../context/AppState';

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ message: '' });
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(GalleryPage.itemCount);
  const { currentPage, setCurrentPage } = usePage();
  const { state, dispatch } = useContext(AppContext);
  const { searchValue, pokemonCards } = state;

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const frontPageParam = urlParams.get('front-page');
  const [, setUrlParams] = useSearchParams();
  const navigate = useNavigate();

  const updateGallery = useCallback(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError({ message: '' });
      try {
        let data;
        if (searchValue) {
          data = await fetchPokemonSearch(searchValue);
        } else {
          const offset = (currentPage - 1) * pageSize;
          data = await fetchPokemonList(offset, pageSize);
        }
        if (data) {
          dispatch({
            type: Actions.setPokemonCards,
            value: await data.pokemonData,
          });
          if (data.totalResults === 1) {
            setCurrentPage(1);
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
  }, [currentPage, dispatch, pageSize, searchValue, setCurrentPage]);

  useEffect(() => {
    updateGallery();
  }, [updateGallery]);

  useEffect(() => {
    if (!frontPageParam) {
      navigate(location.pathname + `?page=${currentPage}`, { replace: true });
    }
  }, [currentPage, frontPageParam, location.pathname, navigate, setUrlParams]);

  const loaderSize = pokemonCards.length || pageSize;
  return (
    <div className="gallery">
      <h2 className="gallery__header">Pokemon Collection</h2>
      <div className="gallery__results">
        <div>Total: {totalResults}</div>
        <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
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
            <Pagination limit={pageSize} totalResults={totalResults} />
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
