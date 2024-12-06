import React from 'react';
import Image from 'next/image';
import styles from '../styles/Section4.module.css';

const Section4 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.textSection}>
        <h4>Dive into the details of our product detection system. Whether it’s identifying products in an image or scanning text through ocr, citrus scan ensures precise recognition and swift results. </h4>
      </div>
      <div className={styles.scanSection}>
        <Image src="/section4.svg" alt="Logo" width={300} height={150} />
        <h2>Click here to scan products</h2>
        <div className={styles.icons}>
          <Image src="/upload-white.svg" alt="Upload" width={30} height={30} />
          <Image src="/camera-white.svg" alt="Camera" width={30} height={30} />
        </div>
      </div>
    </section>
  );
};

export default Section4;