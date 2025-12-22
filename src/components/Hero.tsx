import './Hero.css';

import React from 'react';

import banner from '../assets/banner.png';
import smallBanner from '../assets/banner_small.png';

type HeroProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
};

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <section className='hero' aria-label='Hero'>
      <div className='hero-content'>
        <div className='hero-banner'>
          <picture>
            <source
              srcSet={smallBanner}
              media="(max-width: 550px)"
            />
            <img
              src={banner}
              alt="Banner image blending tech and art, brain and heart."
            />
          </picture>
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
