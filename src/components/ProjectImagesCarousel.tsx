import "./ProjectImagesCarousel.css";

import { useLayoutEffect, useState } from "react";

type ProjectImagesProps = {
  imageUrls: string[];
};

const ProjectImagesCarousel = ({ imageUrls }: ProjectImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useLayoutEffect(() => {
    setCurrentIndex(0);
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
        <img
          src={imageUrls[currentIndex]}
          alt={`Project image ${currentIndex + 1}`}
          className="carousel-image"
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
};

export default ProjectImagesCarousel;
