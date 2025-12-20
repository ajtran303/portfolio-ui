import { useEffect, useRef } from "react";

import type { Project } from '../api/projects'

type ProjectsProps = {
  project: Project;
}

const ProjectComponent = ({ project }: ProjectsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, [project.content]);

  return (
    <article ref={containerRef} dangerouslySetInnerHTML={{ __html: project.content }} />
  );
};

export default ProjectComponent;
