"use client";

import React from 'react';
import Image from 'next/image';
import styles from '../styles/AppMeetWeb.module.css';

const IPhoneFrame = ({ screenshot, alt, className }) => (
  <div className={`${styles.iphoneFrame} ${className}`}>
    <div className={styles.notch}></div>
    <div className={styles.screen}>
      <Image 
        src={screenshot} 
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  </div>
);

const FeatureItem = ({ title, description }) => (
  <div className={styles.featureItem}>
    <div className={styles.featureContent}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);



const AppMeetWeb = () => {
  const featuresSectionData1 = [
    {
      title: "Real-time Shelf Life Estimation:",
      description: "Get instant estimates on how long your produce will last. Our model analyzes the image and provides a reliable prediction based on factors like ripeness and storage conditions."
    },
    {
      title: "Confidence in Every Prediction:",
      description: "Our model provides a confidence score for each identification and prediction. This ensures you can trust the results and make informed decisions."
    },
    {
      title: "Easy Quantity Tracking:",
      description: "Quickly count the number of items in your inventory. Simply upload an image or use your device's camera, and our model will automatically count the fruits and vegetables."
    }
  ];
  const featuresSectionData2 = [
    {
      title: "Automatic Item Identification and Counting:",
      description: "Our model, powered by YOLOv8, can quickly and accurately identify a wide range of objects in real-time, including packaged goods, fruits, and vegetables. It also automatically counts the number of items in each category."
    },
    {
      title: "Detailed Product Information with Qwen2VL:",
      description: "Going beyond simple detection, our model leverages the capabilities of the Qwen2VL language model to extract detailed product information. This includes product name, brand, quantity, expiry date, and other relevant details for packaged goods. For fresh produce, it can provide insights like freshness and estimated shelf life."
    },
    {
      title: "User-Friendly Interface:",
      description: "All the information gathered by the model is presented in an easy-to-understand format. The detected items and their associated details, such as quantity and expiration dates, are displayed clearly."
    }
  ];

  return (
      <div className={styles.container}>
        {/* Hero Section (Unchanged) */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1>From App to Website <br></br> Your Grocery Assistant, Now Online</h1>
            <p>The Citri-Scan project retains the same advanced fruit classification and OCR capabilities, now accessible via a web-based interface to provide a more convenient user experience.</p>
          </div>
          <div className={styles.heroPhones}>
            <IPhoneFrame 
              screenshot="/appLoadS1.jpeg" 
              alt="Home Screen"
              className={styles.phone1}
            />
            <IPhoneFrame 
              screenshot="/appHomepage.jpeg" 
              alt="Scan Screen"
              className={styles.phone2}
            />
            <IPhoneFrame 
              screenshot="/appLoadS2.jpeg" 
              alt="Details Screen"
              className={styles.phone3}
            />
          </div>
        </section>
  
        {/* First Features Section (Two Phones on Right) */}
        <section className={styles.featuresSection}>
          <div className={styles.featureContent}>
            <h3>Freshness Detection Model</h3>
            <div className={styles.featuresList}>
              {featuresSectionData1.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
              ))}
            </div>
          </div>
          <div className={styles.featurePhoneWrapper}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <IPhoneFrame 
                screenshot="/appFruit1.jpeg" 
                alt="Feature Screenshot 1"
                className={styles.featurePhone}
              />
              <IPhoneFrame 
                screenshot="/appFruit2.jpeg" 
                alt="Feature Screenshot 2"
                className={styles.featurePhone}
              />
            </div>
          </div>
        </section>
  
        {/* Second Features Section (Two Phones on Left) */}
        <section className={styles.featuresSection}>
          <div className={styles.featurePhoneWrapper}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <IPhoneFrame 
                screenshot="/appOcr1.jpeg" 
                alt="Feature Screenshot 3"
                className={styles.featurePhone}
              />
              <IPhoneFrame 
                screenshot="/appOcr3.jpeg" 
                alt="Feature Screenshot 4"
                className={styles.featurePhone}
              />
            </div>
          </div>
          <div className={styles.featureContent}>
            <h3>Advanced Detection Capabilities</h3>
            <div className={styles.featuresList}>
              {featuresSectionData2.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default AppMeetWeb;