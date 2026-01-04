'use client';

import './About.css';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import type { SocialLink } from '@/lib/types';

type AboutProps = {
  content: string[];
  imageUrl?: string;
  socials: SocialLink[];
};

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

export default function About({
  content,
  imageUrl = '/avatar2.jpg',
  socials = [],
}: AboutProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaRef = useRef<any>(null);
  const vantaContainer = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [vantaFailed, setVantaFailed] = useState(false);

  // Card visibility observer
  useEffect(() => {
    // Small delay to ensure animation is visible even if element is already in viewport
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1, rootMargin: '-50px' }
      );
      if (cardRef.current) observer.observe(cardRef.current);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Initialize Vanta
  useEffect(() => {
    if (!vantaContainer.current || vantaRef.current || vantaFailed) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !canUseWebGL()) {
      setVantaFailed(true);
      return;
    }

    try {
      // @ts-expect-error Vanta is loaded via CDN
      const vanta = window.VANTA?.NET?.({
        el: vantaContainer.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0x0a0a0a,
        color: 0xff00c8a6,
        points: 10.0,
        maxDistance: 25.0,
        spacing: 15.0,
      });

      if (!vanta) {
        setVantaFailed(true);
        return;
      }

      vantaRef.current = vanta;

      // Use ResizeObserver to detect when container has proper dimensions
      const resizeObserver = new ResizeObserver(() => {
        if (vantaRef.current && typeof vantaRef.current.resize === 'function') {
          vantaRef.current.resize();
        }
      });
      resizeObserver.observe(vantaContainer.current);

      // Also resize after fonts/images load
      const handleLoad = () => {
        if (vantaRef.current && typeof vantaRef.current.resize === 'function') {
          vantaRef.current.resize();
        }
      };
      window.addEventListener('load', handleLoad);

      // Initial resize after a short delay for CSS to settle
      const timeoutId = window.setTimeout(handleLoad, 100);

      return () => {
        window.clearTimeout(timeoutId);
        window.removeEventListener('load', handleLoad);
        resizeObserver.disconnect();
        if (vantaRef.current) {
          vantaRef.current.destroy();
          vantaRef.current = null;
        }
      };
    } catch {
      setVantaFailed(true);
    }
  }, [vantaFailed]);

  return (
    <article className="about">
      <div
        ref={vantaContainer}
        className={`vanta-bg ${vantaFailed ? 'vanta-fallback' : ''}`}
        aria-hidden="true"
      />

      <div className="about-card-wrapper">
        <div
          className={`about-card ${isVisible ? 'visible' : ''}`}
          ref={cardRef}
        >
          <figure className="about-image">
            <Image
              src={imageUrl}
              alt="AJ Tran"
              width={360}
              height={360}
              unoptimized
            />
          </figure>

          <div className="about-content">
            <h2 id="about-heading">About Me</h2>
            {content.map((sentence, i) => (
              <p key={i}>{sentence}</p>
            ))}

            <nav className="about-socials" aria-label="Social Links">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}
