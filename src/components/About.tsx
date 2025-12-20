import React, { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
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
      <div
        className={`about-card ${isVisible ? 'visible' : ''}`}
        ref={cardRef}
      >
        <div className='about-image'>
          <img src='/avatar.jpg' alt='AJ Tran' /> {/* use root path for public */}
        </div>
        <div className='about-content'>
          <h2>About Me</h2>
          <p>
            I'm a fullstack software engineer with a passion for building
            scalable web applications and crafting beautiful UI/UX.
          </p>
          <div className='about-socials'>
            <a href='https://github.com/ajtran303'>GitHub</a>
            <a href='https://linkedin.com/ajtran-dev'>LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
