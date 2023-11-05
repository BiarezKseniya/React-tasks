import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchPokemonSearch, fetchPokemonList } from '../../services/api';
import { GalleryPage } from '../../util/enums';
import { PokemonSpeciesResponseData } from '../../util/interfaces';
import PageSizeSelect from '../page-size-select/PageSizeSelect';
import Pagination from '../pagination/Pagination';
import SmallCardSkeleton from '../skeletons/SmallCardSkeleton';
import SmallCard from '../small-card/SmallCard';
import './Gallery.css';
import { ReactNode, useCallback, useEffect, useState } from 'react';

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonCards, setPokemonCards] = useState<ReactNode[]>([]);
  const [error, setError] = useState({ message: '' });
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(GalleryPage.itemCount);

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const frontPageParam = urlParams.get('front-page');
  const [oldPageValue, setOldPageValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(() => {
    let pageParam = Number(urlParams.get('page'));
    if (!pageParam && location.state) {
      pageParam = location.state.page;
    }
    if (pageParam) {
      setOldPageValue(pageParam);
      return pageParam;
    } else if (frontPageParam) {
      return oldPageValue;
    } else {
      return 1;
    }
  });
  const [, setUrlParams] = useSearchParams();
  const navigate = useNavigate();

  const setPokemonCardsContent = useCallback(
    (pokemonData: PokemonSpeciesResponseData[]) => {
      const pokemonCards = pokemonData.map(
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
            page={currentPage}
          />
        )
      );
      setPokemonCards(pokemonCards);
    },
    [currentPage]
  );

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
          const offset = (currentPage - 1) * pageSize;
          data = await fetchPokemonList(offset, pageSize);
        }
        if (data) {
          setPokemonCardsContent(await data.pokemonData);
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
  }, [currentPage, pageSize, setPokemonCardsContent]);

  useEffect(() => {
    updateGallery();
    window.addEventListener('searchValueChange', updateGallery);

    return () => {
      window.removeEventListener('searchValueChange', updateGallery);
    };
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
        <PageSizeSelect
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div className="gallery__page">
        {error.message ? (
          <div className="gallery__error-message">{error.message}</div>
        ) : isLoading ? (
          [...Array(loaderSize)].map((emptyElement, index) => (
            <SmallCardSkeleton key={index} />
          ))
        ) : (
          <>
            {pokemonCards}
            <Pagination
              limit={pageSize}
              currentPage={currentPage}
              totalResults={totalResults}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
