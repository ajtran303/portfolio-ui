import './App.css'

import { useEffect, useState } from 'react'

import type { Project } from './api/projects'
import { fetchProjects } from './api/projects'
import avatarImg from './assets/avatar2.jpg'
import About from './components/About'
import Footer from './components/Footer'
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

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
  ]

  if (loading) return <main><Navbar links={navLinks} /><p>Loading page...</p></main>
  if (error) return <main><Navbar links={navLinks} /><p>Error: {error}</p></main>


  return (
     <main>
      <Navbar links={navLinks} />

      <section id='hero' className='page hero-page' aria-label='Hero'>
        <Hero
          title='AJ Tran'
          subtitle='Full-stack engineer building reliable backends, smooth APIs, and intuitive frontends.'
          ctaText='View Projects'
          ctaLink='#projects'
        />
      </section>

      <section id='about' className='page about-page' aria-labelledby='about-heading'>
        <About
          content={[
            "Hey, I'm AJ!",
            "I specialize in Ruby, Java, Python, and modern JavaScript frameworks, designing scalable systems, high-traffic APIs, and efficient developer workflows.",
            "I'm also passionate about mentoring, improving developer experience, and exploring AI-powered tools to enhance productivity.",
          ]}
          imageUrl={avatarImg}
          socials={[
            { name: 'GitHub', href: 'https://github.com/ajtran303' },
            { name: 'LinkedIn', href: 'https://linkedin.com/in/ajtran-dev' },
          ]}
        />
      </section>

      <section id='projects' className='page projects-page' aria-labelledby="projects-heading">
        <ProjectCarousel projects={projects} ProjectComponent={ProjectComponent} />
      </section>

      <Footer />
    </main>
  )
}

export default App
