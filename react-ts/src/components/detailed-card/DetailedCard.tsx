import './DetailedCard.css';
import StatsRange from '../stats-range/StatsRange';

const DetailedCard = () => {
  return (
    <div className="detailed-card">
      <h2 className="detailed-card__header">Pikachu</h2>
      <img
        className="detailed-card__image"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png"
        alt="Pikachu"
      />
      <div className="detailed-card__info">
        <div className="detailed-card__weight">Weight: 600</div>
        <div className="detailed-card__stats">
          <StatsRange skillName="HP" skillValue={75} />
          <StatsRange skillName="HP" skillValue={75} />
          <StatsRange skillName="HP" skillValue={75} />
          <StatsRange skillName="HP" skillValue={75} />
          <StatsRange skillName="HP" skillValue={75} />
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
