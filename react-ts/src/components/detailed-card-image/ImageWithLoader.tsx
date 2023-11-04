import { useEffect, useState } from 'react';
import Skeleton from '../skeletons/Skeleton';
import NotFoundImage from './ImageNotFound';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className: string;
}

const ImageWithLoader = ({ src, alt, className }: ImageWithLoaderProps) => {
  const [isImageLoading, setImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageLoading(false);
    img.onerror = () => {
      setImageLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (hasError) {
    return <NotFoundImage />;
  }

  return (
    <div className={className}>
      {isImageLoading && <Skeleton type={className} />}
      {!isImageLoading && <img src={src} alt={alt} />}
    </div>
  );
};

export default ImageWithLoader;
