import { useState } from 'react';

const ErrorButton = () => {
  const [showError, setShowError] = useState(false);

  if (showError) {
    throw new Error('Test error');
  }
  return (
    <button
      className="header__get-error"
      onClick={() => {
        setShowError(true);
      }}
    >
      Get Error
    </button>
  );
};

export default ErrorButton;
