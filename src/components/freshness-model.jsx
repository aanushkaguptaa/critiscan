"use client";

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import styles from '../styles/FreshnessModel.module.css';
import axios from 'axios';

const API_URL = 'http://13.202.99.24:5000';

const cardData = [
  { title: "EfficientNetB5 Model Integration", description: "Our model leverages the powerful EfficientNetB5 architecture, fine-tuned with custom top layers, to achieve high accuracy in image analysis and prediction." },
  { title: "Real-Time Shelf Life Estimation", description: "The model analyzes uploaded images to provide instant estimates on how long your produce will last based on factors like ripeness and storage conditions." },
  { title: "Confidence Score Display", description: "Alongside the shelf life estimate, we provide a confidence score indicating the reliability of the prediction, empowering users to make informed decisions." },
  { title: "Automatic Item Identification", description: "he system can identify various fruits and vegetables automatically, allowing for quick assessments without manual input." },
  { title: "Detailed Freshness Insights", description: "Gain insights into the freshness of your produce, including how to store it properly to extend its shelf life." },
  { title: "Storage Condition Recommendations", description: "To optimize freshness, our system offers tailored storage recommendations based on the item's current state, ensuring that produce stays fresh for longer." },
];

const FreshnessModel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

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
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please check permissions.');
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        setSelectedImage(URL.createObjectURL(file));
        detectFruit(file);
        stopCamera();
      }, 'image/jpeg', 0.8);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.productGrid}>
          {/* Left side - Image Upload */}
          <div className={styles.imageSection}>
            <div className={styles.uploadArea}>
              {isCameraActive ? (
                <div className={styles.cameraContainer}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className={styles.cameraPreview}
                  />
                  <button 
                    onClick={captureImage}
                    className={styles.captureButton}
                  >
                    Capture Image
                  </button>
                </div>
              ) : selectedImage ? (
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
                {loading ? "Processing..." : "Upload Image"}
              </button>
              
              <button 
                className={styles.detectButton}
                onClick={handleCameraCapture}
                disabled={loading || isCameraActive}
              >
                <Image src="/camera-white.svg" alt="Camera" width={20} height={20} />
                <span>Capture Image</span>
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
              <h1>Freshness Check</h1>
              <div className={styles.controls}>
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
              <span className={styles.status}>
                {loading ? "Processing..." : detectionResult ? "Complete" : "Ready"}
              </span>
            </div>

            <div className={styles.fruitSection}>
              <h2 className={styles.fruitHeading}>
                {detectionResult ? detectionResult.fruit_class : "Fruit"}
              </h2>
              <p className={styles.description}>
                {detectionResult ? (
                  <>
                    <strong>Confidence:</strong> {(detectionResult.confidence * 100).toFixed(2)}%<br/>
                    <strong>Shelf Life:</strong> {detectionResult.shelf_life.estimated_days} days<br/>
                    <strong>Storage Information:</strong><br/>
                    • Refrigerator: {detectionResult.shelf_life.refrigerator}<br/>
                    • Freezer: {detectionResult.shelf_life.freezer}<br/>
                    • Shelf: {detectionResult.shelf_life.shelf}<br/>
                    <strong>Expiry Date:</strong> {detectionResult.expiry_date}
                  </>
                ) : (
                  "Upload/Capture Fresh Produce's image to analyze its freshness. Our Freshness detection model will detect the fruit type and provide detailed information about its shelf life, storage recommendations, and expiry estimates."
                )}
              </p>
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
            {error && <div className={styles.error}>{error}</div>}
            {loading && <div className={styles.loading}>Analyzing image...</div>}
          </div>
        </div>
      </div>
      
      {/* Separated card grid section */}
      <div className={styles.cardGridSection}>
        <div className={styles.cardGrid}>
          {cardData.map((card, index) => (
            <div key={index} className={styles.card}>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FreshnessModel;