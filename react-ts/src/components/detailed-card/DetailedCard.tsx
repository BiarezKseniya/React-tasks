import { PokemonStat } from '../../util/interfaces';
import { useFetchPokemonDetailsQuery } from '../../store/slices/apiSlice';
import { useEffect } from 'react';
import { setIsDetailsLoading } from '../../store/slices/pageSlice';
import { useDispatch } from 'react-redux';
import DetailedCardSkeleton from '@/components/skeletons/DetailedCardSkeleton';
import ImageWithLoader from '@/components/detailed-card-image/ImageWithLoader';
import StatsRange from '@/components/stats-range/StatsRange';
import { useRouter } from 'next/router';

const DetailedCard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pokemonId } = router.query;
  const pokemonDetailsQuery = useFetchPokemonDetailsQuery(pokemonId);
  const pokemonData = pokemonDetailsQuery.data;
  const error = pokemonDetailsQuery.error;
  const isLoading =
    pokemonDetailsQuery.isFetching || pokemonDetailsQuery.isLoading;

  useEffect(() => {
    dispatch(setIsDetailsLoading(isLoading));
  }, [isLoading, dispatch]);

  if (error) {
    return (
      <div className="detailed-card__error-message">{error as string}</div>
    );
  }

  if (isLoading) {
    return <DetailedCardSkeleton />;
  }

  return (
    <div className="detailed-card">
      <h2 className="detailed-card__header">{pokemonData.name}</h2>
      <ImageWithLoader
        className="detailed-card__image-wrapper"
        src={pokemonData.sprites.other['official-artwork'].front_default}
        alt={`Picture of ${pokemonData.name}`}
      />
      <div className="detailed-card__info">
        <div className="detailed-card__weight">
          Weight: {pokemonData.weight}
        </div>
        <div className="detailed-card__stats">
          {pokemonData.stats.map((stat: PokemonStat) => (
            <StatsRange
              key={stat.stat.name}
              skillName={stat.stat.name}
              skillValue={stat.base_stat}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
