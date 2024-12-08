import React from 'react';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.socialLinks}>
          <a href="https://github.com/aanushkaguptaa/frontend-website" target="_blank" rel="noopener noreferrer">

            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/krishnahere/" target="_blank" rel="noopener noreferrer">

            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/tsu-ki" target="_blank" rel="noopener noreferrer">
          <span>Made with ❤️ by Team sendittokrishnaa</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;