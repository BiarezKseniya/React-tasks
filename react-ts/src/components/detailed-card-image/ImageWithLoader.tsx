import { useState } from 'react';
import NotFoundImage from './ImageNotFound';
import { ImageWithLoaderProps } from '../../util/interfaces';
import Image from 'next/image';

const ImageWithLoader = ({ src, alt, className }: ImageWithLoaderProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <NotFoundImage />;
  }

  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        loading="eager"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMj6r7DwAEbwIwCsmNYQAAAABJRU5ErkJggg=="
        onError={() => setHasError(true)}
        layout="fill"
      />
    </div>
  );
};

export default ImageWithLoader;
