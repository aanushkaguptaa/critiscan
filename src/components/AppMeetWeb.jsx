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

const FeatureItem = ({ icon, title, description }) => (
  <div className={styles.featureItem}>
    <div className={styles.featureIcon}>
      <Image src={icon} alt={title} width={20} height={20} />
    </div>
    <div className={styles.featureContent}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

const AppMeetWeb = () => {
  const features = [
    {
      icon: "/icons/budget.svg",
      title: "Fruit Classification",
      description: "Cum Et Convallis Risus Placerat Aliquam, Nunc. Scelerisque Aliquet Faucibus Tincidunt Eu Adipiscing Sociis Arcu Lorem Porttitor."
    },
    {
      icon: "/icons/budget.svg",
      title: "Shelf Life Estimation",
      description: "Cum Et Convallis Risus Placerat Aliquam, Nunc. Scelerisque Aliquet Faucibus Tincidunt Eu Adipiscing Sociis Arcu Lorem Porttitor."
    },
    {
      icon: "/icons/budget.svg",
      title: "Accurate Confidence Score",
      description: "Cum Et Convallis Risus Placerat Aliquam, Nunc. Scelerisque Aliquet Faucibus Tincidunt Eu Adipiscing Sociis Arcu Lorem Porttitor."
    }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Make The Best<br />Financial Decisions</h1>
          <p>Cum Et Convallis Risus Placerat Aliquam, Nunc. Scelerisque Aliquet Faucibus Tincidunt Eu Adipiscing Sociis Arcu Lorem Porttitor.</p>
        </div>
        <div className={styles.heroPhones}>
          <IPhoneFrame 
            screenshot="/screenshots/home.png" 
            alt="Home Screen"
            className={styles.phone1}
          />
          <IPhoneFrame 
            screenshot="/screenshots/scan.png" 
            alt="Scan Screen"
            className={styles.phone2}
          />
          <IPhoneFrame 
            screenshot="/screenshots/details.png" 
            alt="Details Screen"
            className={styles.phone3}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featureContent}>
          <h3>Freshness Detection Model</h3>
          <div className={styles.featuresList}>
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        </div>
        <div className={styles.featurePhoneWrapper}>
          <IPhoneFrame 
            screenshot="/screenshots/feature.png" 
            alt="Feature Screenshot"
            className={styles.featurePhone}
          />
        </div>
      </section>

      {/* Advantages Section */}
      <section className={styles.advantagesSection}>
        <h3>Why Choose Uifry?</h3>
        <div className={styles.advantagesGrid}>
          <div className={styles.advantagesContent}>
            <FeatureItem 
              icon="/icons/notification.svg"
              title="Clever Notifications"
              description="Arcu At Dictum Sapien, Mollis. Vulputate Sit Id Accumsan, Ultricies. In Ultricies Malesuada Elit Mi Mauris Etiam Odio. Duis Tristique Lacus, Et Blandit Viverra Nisi Velit."
            />
          </div>
          <div className={styles.advantagesPhoneWrapper}>
            <IPhoneFrame 
              screenshot="/screenshots/advantages1.png" 
              alt="Advantages Screenshot 1"
              className={styles.advantagesPhone}
            />
          </div>
        </div>
        <div className={styles.advantagesGrid}>
          <div className={styles.advantagesPhoneWrapper}>
            <IPhoneFrame 
              screenshot="/screenshots/advantages2.png" 
              alt="Advantages Screenshot 2"
              className={styles.advantagesPhone}
            />
          </div>
          <div className={styles.advantagesContent}>
            <FeatureItem 
              icon="/icons/customize.svg"
              title="Fully Customizable"
              description="Arcu At Dictum Sapien, Mollis. Vulputate Sit Id Accumsan, Ultricies. In Ultricies Malesuada Elit Mi Mauris Etiam Odio. Duis Tristique Lacus, Et Blandit Viverra Nisi Velit."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppMeetWeb; 