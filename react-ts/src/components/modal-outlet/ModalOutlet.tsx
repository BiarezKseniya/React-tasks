import './ModalOutlet.css';
import DetailedCard from '../detailed-card/DetailedCard';
import CloseIcon from '../icons/Close';
import { useNavigate } from 'react-router-dom';

const ModalOutlet = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="shadow" onClick={handleClose} />
      <div className="modal" data-testid="modal-outlet">
        <CloseIcon onClick={handleClose} />
        <DetailedCard />
      </div>
    </>
  );
};

export default ModalOutlet;
