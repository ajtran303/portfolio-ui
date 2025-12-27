import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import type { Project } from './types';

type ProjectFrontmatter = {
  title: string;
  order: number;
  images: string[];
};

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export async function getAllProjects(): Promise<Project[]> {
  const fileNames = fs.readdirSync(projectsDirectory);

  const allProjects = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);
        const frontmatter = matterResult.data as ProjectFrontmatter;

        const processedContent = await remark()
          .use(html)
          .process(matterResult.content);
        const contentHtml = processedContent.toString();

        return {
          slug,
          title: frontmatter.title,
          order: frontmatter.order,
          images: frontmatter.images || [],
          content: contentHtml,
        };
      })
  );

  return allProjects.sort((a, b) => a.order - b.order);
}
