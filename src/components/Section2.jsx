import React from 'react';
import styles from '../styles/Section2.module.css';

const cardData = [
  { title: "1", description: "Choose to use a live camera feed or upload a photo. " },
  { title: "2", description: "The image is pre-processed to optimize quality." },
  { title: "3", description: "Our model analyzes the image: for fruits, it evaluates freshness and quality and for products, it identifies and categorizes items accurately." },
  { title: "4", description: "Receive your results promptly and with precise details." },
  { title: "5", description: "Receive your results promptly and with precise details." },
  { title: "6", description: "Receive your results promptly and with precise details." },
  { title: "7", description: "Receive your results promptly and with precise details." },
  { title: "8", description: "Receive your results promptly and with precise details." },
  { title: "9", description: "Receive your results promptly and with precise details." },
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