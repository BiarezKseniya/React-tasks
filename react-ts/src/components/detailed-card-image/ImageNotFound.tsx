import styles from '@/components/detailed-card-image/ImageNotFound.module.css';
const NotFoundImage = () => {
  return (
    <div
      className={`${styles['detailed-card__image-wrapper']} ${styles['not-found']}`}
    >
      No image available
    </div>
  );
};

export default NotFoundImage;
