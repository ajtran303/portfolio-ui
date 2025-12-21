import './ProjectImagesCarousel.css'

import { useLayoutEffect, useState } from "react";

type ProjectImagesProps = {
  imageUrls: string[];
};

const ProjectImagesCarousel = ({ imageUrls }: ProjectImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    setCurrentIndex(0);
  }, [imageUrls]);

  if (imageUrls.length === 0) return null;

  const handleNext = () => setCurrentIndex((currentIndex + 1) % imageUrls.length);
  const handlePrev = () =>
    setCurrentIndex((currentIndex - 1 + imageUrls.length) % imageUrls.length);

  return (
    <div className="image-carousel">
      <img
        src={imageUrls[currentIndex]}
        alt={`Project image ${currentIndex + 1}`}
        className="carousel-image"
      />
      <div className="carousel-controls">
        <button onClick={handlePrev}>Previous</button>
        <p>
          {currentIndex + 1} / {imageUrls.length}
        </p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ProjectImagesCarousel;
