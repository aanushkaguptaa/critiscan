import Image from 'next/image';
import React from 'react';
import styles from '../styles/Section1.module.css';

const Section1 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.topHalf}>
        <div className={styles.leftContent}>
          <div className={styles.textContainer}>
            <h1>
            Instant freshness check and product identification at your fingertips
            </h1>
            <div className={styles.paragraphContainer}>
              <p>
              Welcome to citrus scan! Citrus scan is an innovative platform utilizing advanced fruit detection and ocr models. 
              </p>
              <p>
              With this tool, you can effortlessly assess the freshness of fruits or identify products with high accuracy, either by using a live feed or uploading an image
              </p>
            </div>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.rightTopHalf}>
            <div className={styles.howItWorks}>
              <Image 
                src="/arrow.svg" 
                alt="How it works" 
                width={100} 
                height={100} 
              />
              <span>How it works</span>
            </div>
          </div>
          <div className={styles.rightBottomHalf}>
            <Image 
              src="/basket.svg" 
              alt="Basket" 
              width={300}
              height={300}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;