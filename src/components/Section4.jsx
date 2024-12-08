"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Section4.module.css';
import { useRouter } from 'next/navigation';

const Section4 = () => {
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
      <div className={styles.textSection}>
        <h4>Dive into the details of our product detection system. Whether it's identifying products in an image or scanning text through ocr, citrus scan ensures precise recognition and swift results.</h4>
      </div>
      <div className={styles.scanSection}>
        <Image 
          src="/section4.svg" 
          alt="Logo" 
          width={isMobile ? 200 : 300} 
          height={isMobile ? 100 : 150} 
          style={{ 
            maxWidth: '100%', 
            height: 'auto' 
          }}
        />
        <h2>Click here to scan products</h2>
        <div className={styles.icons}>
          <button 
            className={styles.iconButton}
            onClick={() => router.push('/ocr-model')}
          >
            <Image 
              src="/upload-white.svg" 
              alt="Upload" 
              width={isMobile ? 20 : 30} 
              height={isMobile ? 20 : 30} 
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section4;