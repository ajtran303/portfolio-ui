import './Navbar.css';

import React, { useEffect, useState } from 'react';

type NavbarProps = {
  links: { label: string; href: string }[];
};

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [active, setActive] = useState<string>(links[0].href);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // offset for sticky navbar

      links.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          const bottom = top + section.clientHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActive(link.href);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <nav className='navbar' aria-label='Main Navigation'>
      <ul className='navbar-links'>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={active === link.href ? 'active' : ''}
              onClick={() => setActive(link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
