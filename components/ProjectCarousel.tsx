'use client';

import './ProjectCarousel.css';

import { useEffect, useRef, useState } from 'react';

import type { Project } from '@/lib/types';

import ProjectCard from './Project';

type ProjectCarouselProps = {
  projects: Project[];
};

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollRequested = useRef(false);
  const total = projects.length;

  useEffect(() => {
    if (scrollRequested.current) {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      scrollRequested.current = false;
    }
  }, [currentIndex]);

  if (total === 0) return <p>No projects available</p>;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    scrollRequested.current = true;
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    scrollRequested.current = true;
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="carousel" aria-label="Project Carousel">
      <h1>Featured Projects</h1>
      <div className="carousel-content">
        <ProjectCard project={currentProject} />
      </div>
      <div className="carousel-navigation">
        <button onClick={handlePrevious}>Previous Project</button>
        <button onClick={handleNext}>Next Project</button>
      </div>
      <div className="carousel-index">
        <p>
          Project {currentIndex + 1} / {total}
        </p>
      </div>
    </div>
  );
}
