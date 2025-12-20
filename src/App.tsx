import './App.css'

import { useEffect, useState } from 'react'

import type { Project } from './api/projects'
import { fetchProjects } from './api/projects'
import avatarImg from './assets/avatar2.jpg'
import bannerImg from './assets/banner.png'
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
          subtitle='Fullstack Software Engineer'
          ctaText='View Projects'
          ctaLink='#projects'
          imgUrl={bannerImg}
        />
      </section>

      <section id='about' className='page' aria-labelledby='about-heading'>
        <About
          content={[
            "Hey, I'm AJ! I build fullstack apps with reliable backends, smooth APIs, and intuitive frontends.",
            "---",
            "Tech stack: Ruby on Rails, TypeScript, React/Node.js, PostgreSQL, Redis, Docker, Kubernetes, AWS, GraphQL"
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
