'use client';

import './Project.css';

import { useEffect, useRef } from 'react';

import type { Project } from '@/lib/types';

import ProjectImagesCarousel from './ProjectImagesCarousel';

type ProjectProps = {
  project: Project;
};

export default function ProjectComponent({ project }: ProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Set external links to open in new tab
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const setLinks = (root: HTMLElement) => {
      const links = root.querySelectorAll('a');
      links.forEach((link) => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    };

    setLinks(container);

    const observer = new MutationObserver(() => setLinks(container));
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [project.content]);

  return (
    <article>
      <div
        ref={containerRef}
        className="project-content"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />
      <ProjectImagesCarousel key={project.slug} imageUrls={project.images} />
    </article>
  );
}
