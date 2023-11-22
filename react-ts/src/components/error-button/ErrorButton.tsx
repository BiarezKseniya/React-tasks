import { useState } from 'react';
import styles from '@/components/header/Header.module.css';

const ErrorButton = () => {
  const [showError, setShowError] = useState(false);

  if (showError) {
    throw new Error('Test error');
  }
  return (
    <button
      className={styles['header__get-error']}
      onClick={() => {
        setShowError(true);
      }}
    >
      Get Error
    </button>
  );
};

export default ErrorButton;
