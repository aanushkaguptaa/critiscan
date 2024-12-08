"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Section3.module.css';
import { useRouter } from 'next/navigation';

const Section3 = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.scanSection}>
        <Image 
          src="/section3.svg" 
          alt="Logo" 
          width={isMobile ? 200 : 300} 
          height={isMobile ? 100 : 150} 
          style={{ 
            maxWidth: '100%', 
            height: 'auto' 
          }}
        />
        <h2>Click here to scan produce freshness</h2>
        <div className={styles.icons}>
          <button 
            className={styles.iconButton}
            onClick={() => router.push('/freshness-model')} 
          >
            <Image 
              src="/upload-white.svg" 
              alt="Upload" 
              width={isMobile ? 20 : 30} 
              height={isMobile ? 20 : 30} 
              style={{ 
                maxWidth: '100%', 
                height: 'auto' 
              }}
            />
          </button>
        </div>
      </div>
      <div className={styles.textSection}>
        <h4>Discover the magic behind citrus scan's fruit detection. Our model is trained to distinguish various fruit types and their freshness levels, helping you make informed decisions effortlessly.</h4>
      </div>
    </section>
  );
};

export default Section3;