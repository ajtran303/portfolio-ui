import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Project } from '../api/projects'
import ProjectComponent from '../components/Project'

describe('Projects Component', () => {
  it('renders projects from props', async () => {
    const mockProject: Project = { slug: 'learnforge-lms', content: '<h1>LearnForge LMS</h1>' };

    render(<ProjectComponent project={mockProject} />);

    expect(await screen.findByRole('heading', { name: /LearnForge LMS/ })).toBeInTheDocument();
  });
});
