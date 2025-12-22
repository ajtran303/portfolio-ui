export type Project = {
  slug: string;
  content: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const getOrderFromSlug = (slug: string): number | null => {
  const prefix = slug.split('-')[0];
  const num = parseInt(prefix, 10);
  return Number.isNaN(num) ? null : num;
};

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
            query GetAllProjects {
              allProjects {
                slug
                content
              }
            }
          `,
    }),
  });

  if (!response.ok) throw new Error('Network response was not ok');

  const json = await response.json();
  const projects: Project[] = json.data.allProjects;

  return projects
    .filter(p => !p.slug.startsWith('draft-'))
    .map(p => ({ ...p, order: getOrderFromSlug(p.slug) }))
    .filter(p => p.order !== null)
    .sort((a, b) => a.order! - b.order!)
    .map(p => {
      const { order: _order, ...rest } = p;
      void _order;
      return rest;
    });
};
