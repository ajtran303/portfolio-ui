import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectCarousel from "@/components/ProjectCarousel";
import { getAllProjects } from "@/lib/projects";

export default async function HomePage() {
  const projects = await getAllProjects();

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
  ];

  const aboutContent = [
    "Hey, I'm AJ!",
    "I specialize in Ruby, Java, Python, and modern JavaScript frameworks, designing scalable systems, high-traffic APIs, and efficient developer workflows.",
    "I'm also passionate about mentoring, improving developer experience, and exploring AI-powered tools to enhance productivity.",
  ];

  const socials = [
    { name: "GitHub", href: "https://github.com/ajtran303" },
    { name: "LinkedIn", href: "https://linkedin.com/in/ajtran-dev" },
    { name: "Email Me", href: "mailto:ajtrandev@gmail.com" },
  ];

  return (
    <main>
      <Navbar links={navLinks} />

      <section id="hero" className="page hero-page" aria-label="Hero">
        <Hero
          title="AJ Tran"
          subtitle="Full-stack engineer building reliable backends, smooth APIs, and intuitive frontends."
          ctaText="View Projects"
          ctaLink="#projects"
        />
      </section>

      <section
        id="about"
        className="page about-page"
        aria-labelledby="about-heading"
      >
        <About
          content={aboutContent}
          imageUrl="/avatar2.jpg"
          socials={socials}
        />
      </section>

      <section
        id="projects"
        className="page projects-page"
        aria-labelledby="projects-heading"
      >
        <ProjectCarousel projects={projects} />
      </section>

      <Footer />
    </main>
  );
}
