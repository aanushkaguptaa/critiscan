"use client";

import Image from 'next/image';
import Link from 'next/link';
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
              <div className={styles.paragraphGroup}>
                <p>
                  Welcome to citrus scan! Citrus scan is an innovative platform utilizing advanced fruit detection and ocr models. 
                </p>
                <Link href="/freshness-model" className={styles.modelButton}>
                  <Image 
                    src="/upload-white.svg" 
                    alt="Freshness Check" 
                    width={24} 
                    height={24} 
                  />
                  <span>Check Freshness</span>
                </Link>
              </div>
              <div className={styles.paragraphGroup}>
                <p>
                  With this tool, you can effortlessly assess the freshness of fruits or identify products with high accuracy, either by using a live feed or uploading an image
                </p>
                <Link href="/ocr-model" className={styles.modelButton}>
                  <Image 
                    src="/upload-white.svg" 
                    alt="OCR Scan" 
                    width={24} 
                    height={24} 
                  />
                  <span>Perform OCR</span>
                </Link>
              </div>
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