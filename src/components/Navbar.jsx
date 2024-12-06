import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Image 
        src="/logo.svg" 
        alt="Logo" 
        width={250} 
        height={125} 
      />
      <div className={styles.links}>
        <Link href="#about">About</Link>
        <Link href="#app">App, Meet Web</Link>
        <Link href="#contact">Write to Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;