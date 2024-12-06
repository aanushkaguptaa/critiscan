"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Image 
        src="/logo.svg" 
        alt="Logo" 
        width={250} 
        height={125} 
      />
      
      {/* Hamburger Menu Button */}
      <div 
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <div className={`${styles.links} ${isMenuOpen ? styles.mobileMenu : ''}`}>
        <Link href="#about" onClick={toggleMenu}>About</Link>
        <Link href="#app" onClick={toggleMenu}>App, Meet Web</Link>
        <Link href="#contact" onClick={toggleMenu}>Write to Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;