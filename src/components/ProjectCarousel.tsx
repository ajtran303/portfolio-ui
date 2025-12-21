import './ProjectCarousel.css'

import { useEffect, useRef, useState } from 'react';

import type { Project } from '../api/projects';

type ProjectCarouselProps = {
  projects: Project[];
  ProjectComponent: React.ComponentType<{ project: Project}>;
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, ProjectComponent }: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollRequested = useRef(false);
  const total = projects.length;

  useEffect(() => {
    if (scrollRequested.current) {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      scrollRequested.current = false; // reset
    }
  }, [currentIndex]); // run after currentIndex changes

  if (total === 0) return <p>No projects available</p>;

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % total);
    scrollRequested.current = true;
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + total) % total);
    scrollRequested.current = true;
  };

  const currentProject: Project = projects[currentIndex];

  return (
    <div className='carousel' aria-label='Project Carousel'>
      <h1>Featured Projects</h1>
      <div className='carousel-content'>
        <ProjectComponent project={currentProject} />
      </div>
      <div className='carousel-navigation'>
        <button onClick={handlePrevious}>Previous Project</button>
        <button onClick={handleNext}>Next Project</button>
      </div>
      <div className='carousel-index'>
        <p>Project {currentIndex + 1} / {total}</p>
      </div>
    </div>
  );
};

export default ProjectCarousel;
