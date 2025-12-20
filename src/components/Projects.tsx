import { useEffect, useState } from "react";

type Project = {
  slug: string;
  content: string;
}



const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
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
        setProjects(json.data.allProjects);
      } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
             setError('Something went wrong');
          }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Projects</h1>
      {projects.map((project => (
        <div key={project.slug}>
          {/* <h3>{project.slug}</h3> */}
          <div dangerouslySetInnerHTML={{ __html: project.content}}/>
        </div>
      )))}
    </div>
  );
};

export default Projects;