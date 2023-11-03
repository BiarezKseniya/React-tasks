import { useEffect, useRef } from 'react';
import './StatsRange.css';

interface StatsRangeProps {
  skillName: string;
  skillValue: number;
}

const StatsRange = ({ skillName, skillValue }: StatsRangeProps) => {
  const rangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rangeRef.current) {
      const percentage =
        ((skillValue - Number(rangeRef.current.min)) /
          (Number(rangeRef.current.max) - Number(rangeRef.current.min))) *
        100;
      rangeRef.current.style.background = `linear-gradient(to right, var(--contrast-color) 0%, var(--contrast-color) ${percentage}%, var(--secondary-color) ${percentage}%, var(--secondary-color) 100%)`;
    }
  }, [skillValue]);

  return (
    <div className="stats-range">
      <label className="stats-range__label">{`${skillName}: ${skillValue}`}</label>
      <input
        className="stats-range__range"
        ref={rangeRef}
        type="range"
        value={skillValue}
        min={0}
        max={100}
        step={1}
        readOnly
      />
    </div>
  );
};

export default StatsRange;
