import { useEffect } from 'react';
import './ModalOutlet.css';
import DetailedCard from '../detailed-card/DetailedCard';

const ModalOutlet = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className="shadow" />
      <div className="modal">
        <DetailedCard />
      </div>
    </>
  );
};

export default ModalOutlet;
