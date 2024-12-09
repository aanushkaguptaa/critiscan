import React from 'react';
import styles from '../styles/Section2.module.css';

const cardData = [
  { title: "Instant Freshness Detection", description: "Quickly assess the freshness of fruits and vegetables using our advanced image recognition technology." },
  { title: "Product Identification", description: "Identify packaged goods with high accuracy, including brand names, quantities, and expiry dates." },
  { title: "Live Feed Functionality", description: "Utilize your device's camera for real-time freshness checks and product scans." },
  { title: "Image Upload Option", description: "Upload images directly from your device for analysis and identification." },
  { title: "Detailed Results Display", description: "View organized results that include freshness estimates, product details, and confidence scores for each prediction." },
  { title: "User-Friendly Interface", description: "Enjoy a seamless experience with an intuitive layout that makes navigation simple and efficient." },
  { title: "Confidence Scores", description: "Each prediction comes with a confidence score, ensuring you can trust the results provided by our models." },
  { title: "Quantity Tracking", description: "Easily count the number of items in your inventory by uploading images or using the live camera feed." },
  { title: "Fully Responsive", description: "The application is fully responsive and works on all devices, including mobile phones, tablets, and desktops." }
];


const Section2 = () => {
  return (
    <section className={styles.section} id="section2">
      <div className={styles.cardGrid}>
        {cardData.map((card, index) => (
          <div key={index} className={styles.card}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section2;