import './DetailedCard.css';
import StatsRange from '../stats-range/StatsRange';
import { useCallback, useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../../services/api';
import { useLocation } from 'react-router';
import DetailedCardSkeleton from '../skeletons/DetailedCardSkeleton';
import ImageWithLoader from '../detailed-card-image/ImageWithLoader';
import { PokemonDetailedData } from '../../util/interfaces';

const DetailedCard = () => {
  const urlParams = new URLSearchParams(useLocation().search);
  const pokemonId = urlParams.get('pokemon');

  const [pokemonData, setPokemonData] = useState<PokemonDetailedData | null>(
    null
  );
  const getPokemonData = useCallback(() => {
    const fetchData = async () => {
      if (!pokemonId) {
        return;
      }
      const data: PokemonDetailedData = await fetchPokemonDetails(pokemonId);
      setPokemonData(data);
    };

    fetchData();
  }, [pokemonId]);

  useEffect(() => {
    getPokemonData();
  }, [getPokemonData]);

  if (!pokemonData) {
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
          {pokemonData.stats.map((stat) => (
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
