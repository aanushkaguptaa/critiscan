"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Navbar.module.css';

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href}
      className={isActive ? styles.active : styles.link}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logoLink}>
        <Image 
          src="/logo.svg" 
          alt="Logo" 
          width={250} 
          height={125} 
          priority
        />
      </Link>
      
      <div 
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`${styles.links} ${isMenuOpen ? styles.mobileMenu : ''}`}>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/app-meet-web">App, Meet Web</NavLink>
        {/* <NavLink href="/freshness-model">Freshness Check</NavLink> */}
        {/* <Link href="/ocr-model">OCR Scan</Link> */}
        <NavLink href="/contact">Write to Us</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;