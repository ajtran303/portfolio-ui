import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Project } from '@/lib/types';

import ProjectCard from '@/components/Project';

describe('Project Component', () => {
  it('renders project content from props', async () => {
    const mockProject: Project = {
      slug: 'learnforge-lms',
      title: 'LearnForge LMS',
      order: 1,
      images: [],
      content: '<h1>LearnForge LMS</h1><p>A learning management system.</p>',
    };

    render(<ProjectCard project={mockProject} />);

    expect(
      await screen.findByRole('heading', { name: /LearnForge LMS/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/A learning management system/)).toBeInTheDocument();
  });

  it('renders image carousel when images are provided', () => {
    const mockProject: Project = {
      slug: 'project-with-images',
      title: 'Project With Images',
      order: 1,
      images: ['/images/test/screenshot1.png', '/images/test/screenshot2.png'],
      content: '<h1>Project With Images</h1>',
    };

    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('shows placeholder when no images', () => {
    const mockProject: Project = {
      slug: 'project-no-images',
      title: 'Project No Images',
      order: 1,
      images: [],
      content: '<h1>Project No Images</h1>',
    };

    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText(/No images available/)).toBeInTheDocument();
  });
});
