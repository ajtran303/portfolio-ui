import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import Projects from '../components/Projects'

const mockFetch = vi.fn();

beforeEach(() => {
  globalThis.fetch = mockFetch as unknown as typeof fetch;
});

afterEach(() => {
  vi.restoreAllMocks()
});

describe('Projects Component', () => {
  it('renders projects from API', async () => {
    const mockProjects: { slug: string; content: string}[] = [
      { slug: 'learnforge-lms', content: '<h1>LearnForge LMS</h1>' },
      { slug: 'portfolio-api', content: '<h1>Portfolio API</h1>' },
    ];

    mockFetch.mockResolvedValueOnce({
      json: async () => ({ data: { allProjects: mockProjects }}),
      ok: true
    } as Response);

    render(<Projects />);

    for (const project of mockProjects) {
      // expect(await screen.findByText(project.slug)).toBeInTheDocument();

      // Match by heading level 1
      expect(await screen.findByRole('heading', { level: 1, name: /LearnForge LMS/ })).toBeInTheDocument();
      expect(await screen.findByRole('heading', { level: 1, name: /Portfolio API/ })).toBeInTheDocument();
    }
  });
});
