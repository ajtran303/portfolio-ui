'use client';

import './ProjectImagesCarousel.css';

import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';

type ProjectImagesProps = {
  imageUrls: string[];
};

export default function ProjectImagesCarousel({
  imageUrls,
}: ProjectImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useLayoutEffect(() => {
    setCurrentIndex(0);
    setImgError(false);
  }, [imageUrls]);

  if (imageUrls.length === 0) {
    return (
      <div className="image-carousel placeholder">
        No images available for this project.
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % imageUrls.length);
    setImgError(false);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + imageUrls.length) % imageUrls.length);
    setImgError(false);
  };

  return (
    <div className="image-carousel">
      {!imgError ? (
        <Image
          src={imageUrls[currentIndex]}
          alt={`Project image ${currentIndex + 1}`}
          className="carousel-image"
          width={600}
          height={400}
          unoptimized
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="carousel-image placeholder">
          <p>Image failed to load</p>
        </div>
      )}
      {imageUrls.length === 1 ? (
        <div className="carousel-controls single-image">
          <p>1 / 1</p>
        </div>
      ) : (
        <div className="carousel-controls">
          <button onClick={handlePrev}>Previous</button>
          <p>
            {currentIndex + 1} / {imageUrls.length}
          </p>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
}
