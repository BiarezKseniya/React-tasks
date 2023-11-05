import { useEffect } from 'react';
import './ModalOutlet.css';
import DetailedCard from '../detailed-card/DetailedCard';
import CloseIcon from '../icons/Close';
import { useNavigate } from 'react-router-dom';

const ModalOutlet = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="shadow" onClick={handleClose} />
      <div className="modal">
        <CloseIcon onClick={handleClose} />
        <DetailedCard />
      </div>
    </>
  );
};

export default ModalOutlet;
