import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Project } from '../api/projects';
import ProjectComponent from '../components/Project';
import ProjectCarousel from '../components/ProjectCarousel';

describe('ProjectCarousel', () => {
  const mockProjects: Project[] = [
    { slug: 'learnforge-lms', content: '<h1>LearnForge LMS</h1>' },
    { slug: 'portfolio-api', content: '<h1>Portfolio API</h1>' },
    { slug: 'portfolio-ui', content: '<h1>Portfolio UI</h1>' }
  ];

  it('renders first project initially', async () => {
    render(<ProjectCarousel projects={mockProjects} ProjectComponent={ProjectComponent} />);

    // expect(await screen.findByText(/learnforge-lms/i)).toBeInTheDocument();
    expect(await screen.findByText(/LearnForge LMS/i)).toBeInTheDocument();
  });

  it('cycles to the next project when clicking Next', async () => {
    render(<ProjectCarousel projects={mockProjects} ProjectComponent={ProjectComponent} />);
    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);

    // expect(await screen.findByText(/portfolio-api/i)).toBeInTheDocument();
    expect(await screen.findByText(/Portfolio API/i)).toBeInTheDocument();
  });

  it('cycles to the previous project when clicking Previous', async () => {
    render(<ProjectCarousel projects={mockProjects} ProjectComponent={ProjectComponent} />);
    const previousButton = screen.getByText('Previous');

    fireEvent.click(previousButton);

    // expect(await screen.findByText(/portfolio-ui/i)).toBeInTheDocument();
    expect(await screen.findByText(/Portfolio UI/i)).toBeInTheDocument();
  });
});
