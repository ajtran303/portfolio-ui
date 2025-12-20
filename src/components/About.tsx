import './About.css';
import { useEffect, useRef, useState } from 'react';
import avatarImg from '../assets/avatar2.jpg';

type SocialLink = { name: string; href: string };
type AboutProps = { content: string[]; imageUrl?: string; socials: SocialLink[] }

const About: React.FC<AboutProps> = ({ content, imageUrl, socials = [] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<any>(null);
  const vantaContainer = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Card visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize Vanta
  useEffect(() => {
    if (!vantaContainer.current || vantaRef.current) return;

    // @ts-ignore
    if (window.VANTA && typeof window.VANTA.NET === 'function') {
      // @ts-ignore
      vantaRef.current = window.VANTA.NET({
        el: vantaContainer.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0x0a0a0a,
        color: 0xffd700,
        points: 10.0,
        maxDistance: 25.0,
        spacing: 15.0
      });

      setTimeout(() => {
        if (vantaRef.current && typeof vantaRef.current.resize === 'function') {
          vantaRef.current.resize();
        }
      }, 100);
    } else {
      console.error('VANTA.NET not available on window');
    }

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    <article className="about">
      <div ref={vantaContainer} className="vanta-bg" />

      <div className="about-card-wrapper">
        <div className={`about-card ${isVisible ? 'visible' : ''}`} ref={cardRef}>
          <figure className="about-image">
            <img src={imageUrl || avatarImg} alt="AJ Tran" />
          </figure>

          <div className="about-content">
            <h2>About Me</h2>
            {content.map((sentence, i) => <p key={i}>{sentence}</p>)}

            <nav className="about-socials" aria-label="Social Links">
              {socials.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">{social.name}</a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
};

export default About;
