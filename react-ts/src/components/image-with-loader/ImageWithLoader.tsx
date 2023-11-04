import { useState } from 'react';
import Skeleton from '../skeletons/Skeleton';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className: string;
}

const ImageWithLoader = ({ src, alt, className }: ImageWithLoaderProps) => {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <div className={className}>
      {isImageLoading && <Skeleton type={className} />}
      <img src={src} alt={alt} onLoad={() => setImageLoading(false)} />
    </div>
  );
};

export default ImageWithLoader;
