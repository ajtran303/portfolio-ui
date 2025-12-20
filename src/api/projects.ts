export type Project = {
  slug: string;
  content: string;
}

const API_URL = import.meta.env.VITE_API_URL;

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
  return json.data.allProjects as Project[];
};
