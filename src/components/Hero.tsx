import './Hero.css';

import React from 'react';


type HeroProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imgUrl: string;
};

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaLink, imgUrl }) => {
  return (
    <section className='hero'>
      <div className='hero-content'>
        <div className='hero-banner'>
          <img src={imgUrl} alt='AJ Tran' />
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
