import './Project.css';

import { useEffect, useMemo,useRef } from "react";

import type { Project } from '../api/projects';
import ProjectImagesCarousel from './ProjectImagesCarousel';

type ProjectsProps = {
  project: Project;
};

const ProjectComponent = ({ project }: ProjectsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { htmlWithoutImages, imageUrls } = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(project.content, "text/html");

    const images = Array.from(doc.querySelectorAll("img")).map(img => img.src);
    // Remove images from the HTML
    doc.querySelectorAll("img").forEach(img => img.remove());

    return {
      htmlWithoutImages: doc.body.innerHTML,
      imageUrls: images,
    };
  }, [project.content]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const setLinks = (root: HTMLElement) => {
      const links = root.querySelectorAll("a");
      links.forEach(link => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      });
    };

    setLinks(container);

    const observer = new MutationObserver(() => setLinks(container));
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [htmlWithoutImages]);

  return (
    <article>
      <div
        ref={containerRef} 
        className="project-content"
        dangerouslySetInnerHTML={{ __html: htmlWithoutImages }} 
      />
      <ProjectImagesCarousel key={project.slug} imageUrls={imageUrls} />
    </article>
  );
};

export default ProjectComponent;
