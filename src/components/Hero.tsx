import './Hero.css';

import React, { useEffect, useState } from 'react';

import banner from '../assets/banner.png';
import smallBanner from '../assets/banner_small.png';

type HeroProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
};

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaLink }) => {
  const [imgUrl, setImgUrl] = useState(banner);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 480px)');

    const handleChange = (e: MediaQueryListEvent) => {
      setImgUrl(e.matches ? smallBanner : banner);
    };

    setImgUrl(mediaQuery.matches ? smallBanner : banner);

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section className='hero' aria-label='Hero'>
      <div className='hero-content'>
        <div className='hero-banner'>
          <img src={imgUrl} alt='Banner image blending tech and art, brain and heart.' />
        </div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {ctaText && ctaLink && (
          <a href={ctaLink} className='hero-cta'>
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
