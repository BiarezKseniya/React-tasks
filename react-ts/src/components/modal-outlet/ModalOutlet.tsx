import styles from '@/components/modal-outlet/ModalOutlet.module.css';
import CloseIcon from '../icons/Close';
import { setIsModalOpen } from '../../store/slices/pageSlice';
import { useDispatch } from 'react-redux';
import DetailedCard from '@/components/detailed-card/DetailedCard';
import { useRouter } from 'next/router';
import { PokemonDetailedData } from '@/util/interfaces';

interface ModalOutletProps {
  currentPage: number;
  modalData: PokemonDetailedData;
  modalError?: string;
}

const ModalOutlet = ({
  currentPage,
  modalData,
  modalError,
}: ModalOutletProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClose = () => {
    router.push(`/page/${currentPage}`);
    dispatch(setIsModalOpen(false));
  };

  return (
    <>
      <div className={styles['shadow']} onClick={handleClose} />
      <div className={styles['modal']} data-testid="modal-outlet">
        <CloseIcon onClick={handleClose} />
        <DetailedCard modalData={modalData} modalError={modalError} />
      </div>
    </>
  );
};

export default ModalOutlet;
