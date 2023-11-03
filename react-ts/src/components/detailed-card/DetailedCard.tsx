import './DetailedCard.css';
import StatsRange from '../stats-range/StatsRange';
import { useCallback, useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../../services/api';
import { useLocation } from 'react-router';

interface PokemonDetailedData {
  name: string;
  weight: number;
  stats: PokemonStat[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

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
    return <div>Loading...</div>;
  }

  return (
    <div className="detailed-card">
      <h2 className="detailed-card__header">{pokemonData.name}</h2>
      <img
        className="detailed-card__image"
        src={pokemonData.sprites.other['official-artwork'].front_default}
        alt={`Picture of ${pokemonData.name}`}
      />
      <div className="detailed-card__info">
        <div className="detailed-card__weight">
          Weight: {pokemonData.weight}
        </div>
        <div className="detailed-card__stats">
          {pokemonData.stats.map((stat, index) => (
            <StatsRange
              key={index}
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
