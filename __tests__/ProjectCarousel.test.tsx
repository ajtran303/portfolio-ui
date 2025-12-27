import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Project } from '@/lib/types';

import ProjectCarousel from '@/components/ProjectCarousel';

describe('ProjectCarousel', () => {
  const mockProjects: Project[] = [
    {
      slug: 'learnforge-lms',
      title: 'LearnForge LMS',
      order: 1,
      images: ['/images/learnforge/screenshot.png'],
      content: '<h1>LearnForge LMS</h1>',
    },
    {
      slug: 'portfolio-api',
      title: 'Portfolio API',
      order: 2,
      images: [],
      content: '<h1>Portfolio API</h1>',
    },
    {
      slug: 'portfolio-ui',
      title: 'Portfolio UI',
      order: 3,
      images: [],
      content: '<h1>Portfolio UI</h1>',
    },
  ];

  it('renders first project initially', async () => {
    render(<ProjectCarousel projects={mockProjects} />);

    expect(await screen.findByText(/LearnForge LMS/i)).toBeInTheDocument();
  });

  it('cycles to the next project when clicking Next', async () => {
    render(<ProjectCarousel projects={mockProjects} />);
    const nextButton = screen.getByText('Next Project');

    fireEvent.click(nextButton);

    expect(await screen.findByText(/Portfolio API/i)).toBeInTheDocument();
  });

  it('cycles to the previous project when clicking Previous', async () => {
    render(<ProjectCarousel projects={mockProjects} />);
    const previousButton = screen.getByText('Previous Project');

    fireEvent.click(previousButton);

    expect(await screen.findByText(/Portfolio UI/i)).toBeInTheDocument();
  });

  it('shows project counter', () => {
    render(<ProjectCarousel projects={mockProjects} />);

    expect(screen.getByText(/Project 1 \/ 3/)).toBeInTheDocument();
  });

  it('shows "No projects available" when empty', () => {
    render(<ProjectCarousel projects={[]} />);

    expect(screen.getByText(/No projects available/)).toBeInTheDocument();
  });
});
