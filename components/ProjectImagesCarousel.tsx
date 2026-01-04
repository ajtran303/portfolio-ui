'use client';

import './ProjectImagesCarousel.css';

import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';

import type { ProjectImage } from '@/lib/types';

type ProjectImagesProps = {
  images: ProjectImage[];
};

export default function ProjectImagesCarousel({
  images,
}: ProjectImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useLayoutEffect(() => {
    setCurrentIndex(0);
    setImgError(false);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="image-carousel placeholder">
        No images available for this project.
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
    setImgError(false);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    setImgError(false);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="image-carousel">
      {!imgError ? (
        <Image
          src={currentImage.url}
          alt={currentImage.alt}
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
      {images.length === 1 ? (
        <div className="carousel-controls single-image">
          <p>1 / 1</p>
        </div>
      ) : (
        <div className="carousel-controls">
          <button onClick={handlePrev}>Previous</button>
          <p>
            {currentIndex + 1} / {images.length}
          </p>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
}
