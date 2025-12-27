import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getAllProjects } from './projects';

// Mock fs module
vi.mock('fs', () => ({
  default: {
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}));

import fs from 'fs';

describe('getAllProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty array when no markdown files', async () => {
    vi.mocked(fs.readdirSync).mockReturnValue([]);

    const projects = await getAllProjects();

    expect(projects).toEqual([]);
  });

  it('parses markdown files with frontmatter', async () => {
    vi.mocked(fs.readdirSync).mockReturnValue([
      '01-test-project.md' as unknown as ReturnType<typeof fs.readdirSync>[0],
    ]);
    vi.mocked(fs.readFileSync).mockReturnValue(`---
title: "Test Project"
order: 1
images:
  - "/images/test/screenshot.png"
---

## Test Project

This is a test project.
`);

    const projects = await getAllProjects();

    expect(projects).toHaveLength(1);
    expect(projects[0]).toMatchObject({
      slug: '01-test-project',
      title: 'Test Project',
      order: 1,
      images: ['/images/test/screenshot.png'],
    });
    expect(projects[0].content).toContain('<h2>Test Project</h2>');
    expect(projects[0].content).toContain('This is a test project');
  });

  it('sorts projects by order', async () => {
    vi.mocked(fs.readdirSync).mockReturnValue([
      '02-second.md' as unknown as ReturnType<typeof fs.readdirSync>[0],
      '01-first.md' as unknown as ReturnType<typeof fs.readdirSync>[0],
      '03-third.md' as unknown as ReturnType<typeof fs.readdirSync>[0],
    ]);
    vi.mocked(fs.readFileSync).mockImplementation((path) => {
      const pathStr = String(path);
      if (pathStr.includes('01-first'))
        return `---\ntitle: "First"\norder: 1\nimages: []\n---\nContent`;
      if (pathStr.includes('02-second'))
        return `---\ntitle: "Second"\norder: 2\nimages: []\n---\nContent`;
      if (pathStr.includes('03-third'))
        return `---\ntitle: "Third"\norder: 3\nimages: []\n---\nContent`;
      return '';
    });

    const projects = await getAllProjects();

    expect(projects).toHaveLength(3);
    expect(projects[0].title).toBe('First');
    expect(projects[1].title).toBe('Second');
    expect(projects[2].title).toBe('Third');
  });

  it('handles missing images in frontmatter', async () => {
    vi.mocked(fs.readdirSync).mockReturnValue([
      '01-no-images.md' as unknown as ReturnType<typeof fs.readdirSync>[0],
    ]);
    vi.mocked(fs.readFileSync).mockReturnValue(`---
title: "No Images"
order: 1
---

Content without images.
`);

    const projects = await getAllProjects();

    expect(projects[0].images).toEqual([]);
  });
});
