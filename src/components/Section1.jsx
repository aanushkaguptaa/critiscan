"use client";

import Image from 'next/image';
import React from 'react';
import styles from '../styles/Section1.module.css';

const Section1 = () => {
  const scrollToSection2 = () => {
    const section2 = document.getElementById('section2');
    if (section2) {
      section2.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <div className={styles.mobileHowItWorks}>
              <button onClick={scrollToSection2} className={styles.howItWorksButton}>
                <Image 
                  src="/arrow.svg" 
                  alt="How it works" 
                  width={50} 
                  height={50} 
                />
                <span>How it works</span>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.rightTopHalf}>
            <div className={styles.howItWorks} onClick={scrollToSection2}>
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