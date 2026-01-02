import './Hero.css';

import Image from 'next/image';

type HeroProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
};

export default function Hero({ title, subtitle, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-content">
        <div className="hero-banner">
          <Image
            src="/banner.png"
            alt="Banner image blending tech and art, brain and heart."
            width={1200}
            height={396}
            priority
            unoptimized
            className="banner-desktop"
          />
          <Image
            src="/banner_small.png"
            alt="Banner image blending tech and art, brain and heart."
            width={550}
            height={550}
            priority
            unoptimized
            className="banner-mobile"
          />
        </div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {ctaText && ctaLink && (
          <a href={ctaLink} className="hero-cta">
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
