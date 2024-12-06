import React from 'react';
import Image from 'next/image';
import styles from '../styles/Section3.module.css';

const Section3 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.scanSection}>
        <Image src="/section3.svg" alt="Logo" width={300} height={150} />
        <h2>Click here to scan produce freshness</h2>
        <div className={styles.icons}>
          <Image src="/upload-white.svg" alt="Upload" width={30} height={30} />
          <Image src="/camera-white.svg" alt="Camera" width={30} height={30} />
        </div>
      </div>
      <div className={styles.textSection}>
        <h4> Discover the magic behind citrus scan's fruit detection. Our model is trained to distinguish various fruit types and their freshness levels, helping you make informed decisions effortlessly. </h4>
      </div>
    </section>
  );
};

export default Section3;