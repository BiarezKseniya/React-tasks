import styles from '@/components/modal-outlet/ModalOutlet.module.css';
import CloseIcon from '../icons/Close';
// import { useNavigate } from 'react-router-dom';
import { setIsModalOpen } from '../../store/slices/pageSlice';
import { useDispatch } from 'react-redux';
import DetailedCard from '@/components/detailed-card/DetailedCard';

const ModalOutlet = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    // navigate(-1);
    dispatch(setIsModalOpen(false));
  };

  return (
    <>
      <div className={styles['shadow']} onClick={handleClose} />
      <div className={styles['modal']} data-testid="modal-outlet">
        <CloseIcon onClick={handleClose} />
        <DetailedCard />
      </div>
    </>
  );
};

export default ModalOutlet;
