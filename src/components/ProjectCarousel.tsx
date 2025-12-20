import { useState } from "react";

import type { Project } from "../api/projects";

type ProjectCarouselProps = {
  projects: Project[];
  ProjectComponent: React.ComponentType<{ project: Project}>;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, ProjectComponent }: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const total = projects.length;

  if (total === 0) return <p>No projects available</p>;

  const handleNext = () => setCurrentIndex(prev => (prev + 1) % total);
  const handlePrevious = () => setCurrentIndex(prev => (prev - 1 + total) % total);

  const currentProject: Project = projects[currentIndex];

  return (
    <div>
      <ProjectComponent project={currentProject} />
      <p>{currentIndex + 1} / {total}</p>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ProjectCarousel;
