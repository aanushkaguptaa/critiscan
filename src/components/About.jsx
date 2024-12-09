"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/About.module.css';

const TeamMember = ({ name, role, description, skills, github, linkedin, email, resume }) => (
    <div className={styles.memberContainer}>
  <div className={styles.memberCard}>
    <div className={styles.memberInfo}>
      <div className={styles.headerRow}>
        <h2>{name}</h2>
        <div className={styles.socialLinks}>
          <Link href={linkedin} target="_blank" aria-label="LinkedIn">
            <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
          </Link>
          <Link href={github} target="_blank" aria-label="GitHub">
            <Image src="/icons/github.svg" alt="GitHub" width={24} height={24} />
          </Link>
          <Link href={`mailto:${email}`} aria-label="Email">
            <Image src="/icons/email.svg" alt="Email" width={24} height={24} />
          </Link>
        </div>
      </div>
      
      <div className={styles.role}>
        {role.title} 
      </div>
      
      <p className={styles.description}>{description}</p>

      <div className={styles.skills}>
        {skills.map((skill, index) => (
          <span key={index} className={styles.skillTag}>
            {skill}
          </span>
        ))}
      </div>

      <Link href={resume} target="_blank" className={styles.resumeButton}>
        <Image src="/icons/download.svg" alt="" width={20} height={20} />
        View Resume
      </Link>
    </div>
  </div>
</div>
);

const About = () => {
  const team = [
    {
      name: "Krishna Kaushal",
      role: {
        title: "Full Stack Developer"
      },
      description: "I'm Krishna Kaushal, a final-year B.Tech student.",
      skills: ["MERN", "Python", "Java", "Machine Learning"],
      github: "https://github.com/tsu-ki",
      linkedin: "https://www.linkedin.com/in/krishnahere/",
      email: "sendittokrishna@gmail.com",
      resume: "https://drive.google.com/file/d/1EvCtatdNNY1FnjlMTgt1iqPzKw1A6aYa/view?usp=sharing"
    },
    {
      name: "Anushka Gupta",
      role: {
        title: "AI/ML Engineer"
      },
      description: "I'm Anushka Gupta, a final-year B.Tech student.",
      skills: ["NextJS", "React", "Python", "Machine Learning", "AWS"],
      github: "https://github.com/aanushkaguptaa",
      linkedin: "https://www.linkedin.com/in/anushka-gupta-here/",
      email: "anushkayol001@gmail.com",
      resume: "https://drive.google.com/file/d/1_4h6Gld5ybDsHh8OdJto2riisojNksCG/view?usp=sharing"
    }
  ];

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.teamGrid}>
        {team.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default About;
