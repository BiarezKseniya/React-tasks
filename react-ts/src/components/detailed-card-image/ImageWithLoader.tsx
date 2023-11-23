import { useState } from 'react';
import Skeleton from '../skeletons/Skeleton';
import NotFoundImage from './ImageNotFound';
import { ImageWithLoaderProps } from '../../util/interfaces';
import Image from 'next/image';

const ImageWithLoader = ({ src, alt, className }: ImageWithLoaderProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <NotFoundImage />;
  }

  return (
    <div className={className}>
      {isImageLoading && <Skeleton type={className} />}
      {!isImageLoading && (
        <Image
          src={src}
          alt={alt}
          onLoad={() => setIsImageLoading(false)}
          onError={() => setHasError(true)}
          layout="fill"
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
