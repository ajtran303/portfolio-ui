import './About.css';

import { useEffect, useRef, useState } from 'react';

import avatarImg from '../assets/avatar2.jpg'

type SocialLink = {
  name: string;
  href: string;
};

type AboutProps = {
  content: string[];
  imageUrl?: string;
  socials: SocialLink[];
}

const About: React.FC<AboutProps> = ({ content, imageUrl, socials =[] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting); // toggle every time
        });
      },
      { threshold: 0.1 } // 10% visible
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className='about'>
      <div className='about-card-wrapper'>
        <div
          className={`about-card ${isVisible ? 'visible' : ''}`}
          ref={cardRef}
        >
          <div className='about-image'>
            <img src={imageUrl || avatarImg} alt='AJ Tran' />
          </div>
          <div className='about-content'>
            <h2>About Me</h2>
            <p>
              {content.map((sentence) => <p>{sentence}</p>)}
            </p>
            <div className='about-socials'>
              {socials.map((social) => (
                <a key={social.name} href={social.href} target='_blank' rel='noopener noreferrer'>
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
