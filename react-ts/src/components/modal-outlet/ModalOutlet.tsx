import styles from '@/components/modal-outlet/ModalOutlet.module.css';
import CloseIcon from '../icons/Close';
import { setIsModalOpen } from '../../store/slices/pageSlice';
import { useDispatch, useSelector } from 'react-redux';
import DetailedCard from '@/components/detailed-card/DetailedCard';
import { useRouter } from 'next/router';
import { RootState } from '@/store/store';

const ModalOutlet = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.page.currentPage);

  const handleClose = () => {
    router.push(`/page/${currentPage}`);
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
