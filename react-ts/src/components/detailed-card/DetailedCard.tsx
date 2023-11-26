import { PokemonDetailedData, PokemonStat } from '../../util/interfaces';
import ImageWithLoader from '@/components/detailed-card-image/ImageWithLoader';
import StatsRange from '@/components/stats-range/StatsRange';

interface DetailedCardProps {
  modalData: PokemonDetailedData;
  modalError?: string;
}
const DetailedCard = ({ modalData, modalError }: DetailedCardProps) => {
  if (modalError) {
    return (
      <div className="detailed-card__error-message">{modalError as string}</div>
    );
  }

  return (
    <div className="detailed-card">
      <h2 className="detailed-card__header">{modalData.name}</h2>
      <ImageWithLoader
        className="detailed-card__image-wrapper"
        src={modalData.sprites.other['official-artwork'].front_default}
        alt={`Picture of ${modalData.name}`}
      />
      <div className="detailed-card__info">
        <div className="detailed-card__weight">Weight: {modalData.weight}</div>
        <div className="detailed-card__stats">
          {modalData.stats.map((stat: PokemonStat) => (
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
