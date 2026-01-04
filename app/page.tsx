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
    { label: "Resume", href: "/AJ_Tran_Resume.pdf", newTab: true },
  ];

  const aboutContent = [
    "Hey, I'm AJ!",
    "By day: Ruby, Python, Java, TypeScript. I build systems that scale, modernize code that doesn't, and maintain the kind of test coverage that lets you sleep at night.",
    'By night: NLP on album lyrics, computer vision for dance analysis, CLI tools for vinyl collectors. Projects that start with "What if?" and end with working code.',
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
          subtitle="Full-stack software engineer. Enterprise scale by day. Personal scale by night."
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
