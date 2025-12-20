import './Navbar.css';

import React from 'react';

type NavbarProps = {
  links: { label: string; href: string }[];
};

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  return (
    <nav className='navbar' aria-label='Main Navigation'>
      <ul className='navbar-links'>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
