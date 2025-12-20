import './App.css'

import { useEffect, useState } from 'react'

import type { Project } from './api/projects'
import { fetchProjects } from './api/projects'
import About from "./components/About"
import Hero from './components/Hero'
import Navbar from './components/Navbar'
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

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
  ]

  return (
     <main>
      <Navbar links={navLinks} />
      <section id='hero' className='page hero-page'>
        <Hero
          title='AJ Tran'
          subtitle='Fullstack Software Engineer'
          ctaText='View Projects'
          ctaLink='#projects'
        />
      </section>
      <section id="about" className='page'>
        <About
          content="Hi, I'm AJ Tran, a Fullstack Software Engineer specializing in React, Node.js, and modern web development. I love building clean, efficient, and user-friendly applications."
          imageUrl="../public/avatar.jpg"
          socials={[
            { name: "GitHub", href: "https://github.com/ajtran303" },
            { name: "LinkedIn", href: "https://linkedin.com/in/ajtran-dev" },
          ]}
        />
      </section>
      <section id='projects' className='page projects-page'>
        <ProjectCarousel projects={projects} ProjectComponent={ProjectComponent} />
      </section>
    </main>
  )
}

export default App
