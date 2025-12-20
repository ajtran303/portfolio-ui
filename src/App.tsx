import './App.css'

import { useEffect, useState } from 'react'

import type { Project } from './api/projects'
import { fetchProjects } from './api/projects'
import Hero from './components/Hero'
import ProjectComponent from './components/Project'
import ProjectCarousel from './components/ProjectCarousel'

function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Something went wrong');
      } finally {
        setLoading(false)
      }
    };

    loadProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>
  if (error) return <p>Error: {error}</p>

  return (
     <div>

      <Hero
        title='AJ Tran'
        subtitle='Fullstack Software Engineer'
        ctaText='View Projects'
        ctaLink='#projects'
      />
      <ProjectCarousel projects={projects} ProjectComponent={ProjectComponent} />
    </div>
  )
}

export default App
