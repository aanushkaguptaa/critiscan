"use client";

import Image from 'next/image';
import React, { useState } from 'react'
import styles from '../styles/FreshnessModel.module.css';
import axios from 'axios';

const API_URL = 'http://13.202.99.24:5000';

const FreshnessModel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      detectFruit(file);
    }
  };

  const detectFruit = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${API_URL}/detect_fruit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      setDetectionResult(response.data);
    } catch (err) {
      console.error('Error detecting fruit:', err);
      setError('An error occurred while detecting the fruit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      
      video.srcObject = stream;
      await video.play();

      canvas.width = 500;  // Set to desired dimensions
      canvas.height = 500;
      
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      stream.getTracks().forEach(track => track.stop());
      
      canvas.toBlob(async (blob) => {
        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
        setSelectedImage(URL.createObjectURL(file));
        detectFruit(file);
      }, 'image/jpeg', 0.8); // 0.8 quality for compression
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Could not access camera. Please check permissions.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productGrid}>
        {/* Left side - Image Upload */}
        <div className={styles.imageSection}>
          <div className={styles.uploadArea}>
            {selectedImage ? (
              <Image 
                src={selectedImage}
                alt="Selected fruit"
                width={300}
                height={300}
                className={styles.previewImage}
              />
            ) : (
              <Image 
                src="/object.png"
                alt="Upload placeholder"
                width={300}
                height={300}
                className={styles.previewImage}
              />
            )}
          </div>
          
          <div className={styles.uploadButtons}>
            <button 
              className={styles.detectButton}
              onClick={() => document.getElementById('imageInput').click()}
              disabled={loading}
            >
              <Image src="/upload-white.svg" alt="" width={20} height={20} />
              {loading ? "Processing..." : "Detect Freshness"}
            </button>
            
            <button 
              className={styles.cameraButton}
              onClick={handleCameraCapture}
              disabled={loading}
            >
              <Image src="/camera.svg" alt="Camera" width={20} height={20} />
            </button>
          </div>
          
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        {/* Right side - Detection Results */}
        <div className={styles.detailsSection}>
          <div className={styles.header}>
            <h1>{detectionResult ? detectionResult.fruit_class : "Freshness Check"}</h1>
            <span className={styles.status}>
              {loading ? "Processing..." : detectionResult ? "Complete" : "Ready"}
            </span>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <Image src="/drop.svg" alt="Confidence" width={24} height={24} />
              <div>
                <h3>Confidence</h3>
                <p>{detectionResult ? `${(detectionResult.confidence * 100).toFixed(2)}%` : "N/A"}</p>
              </div>
            </div>

            <div className={styles.metricCard}>
              <Image src="/calender.svg" alt="Expiry" width={24} height={24} />
              <div>
                <h3>Expiry Date</h3>
                <p>{detectionResult ? detectionResult.expiry_date : "N/A"}</p>
              </div>
            </div>

            <div className={styles.metricCard}>
              <Image src="/growth.svg" alt="Shelf Life" width={24} height={24} />
              <div>
                <h3>Shelf Life</h3>
                <p>{detectionResult ? `${detectionResult.shelf_life.estimated_days} days` : "N/A"}</p>
              </div>
            </div>

            <div className={styles.metricCard}>
              <Image src="/star.svg" alt="Storage" width={24} height={24} />
              <div>
                <h3>Storage Info</h3>
                <p>{detectionResult ? `Refrigerator: ${detectionResult.shelf_life.refrigerator}` : "N/A"}</p>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.quantityControl}>
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Image src="/minus.svg" alt="Decrease" width={16} height={16} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <Image src="/plus.svg" alt="Increase" width={16} height={16} />
              </button>
            </div>
            
            <button 
              className={styles.addToCartButton}
              onClick={() => {/* Add your cart logic */}}
              disabled={!detectionResult}
            >
              Add to Cart
            </button>
            
            <button 
              className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Image 
                src={isLiked ? "/heart-filled.svg" : "/heart.svg"}
                alt="Like"
                width={20}
                height={20}
              />
            </button>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {loading && <div className={styles.loading}>Analyzing image...</div>}
        </div>
      </div>
    </div>
  );
};

export default FreshnessModel; 