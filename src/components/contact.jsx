"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.contactContainer}>
      <h1>Contact Us</h1>
      <p className={styles.subtitle}>Any question or remarks? Just write us a message!</p>

      <div className={styles.contactContent}>
        {/* Left Side - Contact Information */}
        <div className={styles.contactInfo}>
          <h2>Contact Information</h2>
          <p>Need help? We're here to assist you!</p>
          
          <div className={styles.infoDetails}>
            <div className={styles.infoItem}>
              <Image src="/icons/phone.svg" alt="Phone" width={24} height={24} className={styles.icon} />
              <span>+91 8081321713</span>
            </div>
            <div className={styles.infoItem}>
              <Image src="/icons/email.svg" alt="Email" width={24} height={24} className={styles.icon} />
              <div>
                <p>sendittokrishnaa@gmail.com</p>
                <p>anushkayol001@gmail.com</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Image src="/icons/location.svg" alt="Location" width={24} height={24} className={styles.icon} />
              <span>JSS Academy of Technical Education, Noida, India</span>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input 
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name" 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input 
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name" 
                required 
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email" 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 012 3456 789"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Select Subject?</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input 
                  type="radio"
                  name="subject"
                  value="general"
                  checked={formData.subject === 'general'}
                  onChange={handleChange}
                />
                General Inquiry
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio"
                  name="subject"
                  value="technical"
                  checked={formData.subject === 'technical'}
                  onChange={handleChange}
                />
                <span>Technical Support</span>
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio"
                  name="subject"
                  value="project"
                  checked={formData.subject === 'project'}
                  onChange={handleChange}
                />
                <span>Project Inquiry</span>
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio"
                  name="subject"
                  value="other"
                  checked={formData.subject === 'other'}
                  onChange={handleChange}
                />
                <span>Other</span>
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message.."
              rows={4}
              required
            ></textarea>
          </div>

          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;