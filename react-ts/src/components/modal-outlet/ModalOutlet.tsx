import './ModalOutlet.css';
import DetailedCard from '../detailed-card/DetailedCard';
import CloseIcon from '../icons/Close';
import { useNavigate } from 'react-router-dom';
import { setIsModalOpen } from '../../store/slices/pageSlice';
import { useDispatch } from 'react-redux';

const ModalOutlet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    navigate(-1);
    dispatch(setIsModalOpen(false));
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
