import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
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
      expect(await screen.findByText(project.slug)).toBeInTheDocument();
      expect(await screen.findByText(project.content)).toBeInTheDocument();
    };
  })
});
