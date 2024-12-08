"use client";

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import styles from '../styles/OcrModel.module.css'; // We'll reuse most styles
import axios from 'axios';

const API_URL = 'http://13.202.99.24:5000';

const OcrModel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      performOcr(file);
    }
  };

  const performOcr = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${API_URL}/perform_ocr`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      setOcrResult(response.data);
    } catch (err) {
      console.error('Error performing OCR:', err);
      setError('An error occurred while performing OCR. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Camera handling functions (same as freshness model)
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
        performOcr(file);
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
                alt="Selected image"
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

        {/* Right side - OCR Results */}
        <div className={styles.detailsSection}>
          <div className={styles.header}>
            <h1>Product Attribute Extraction</h1>
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
              {loading ? "Processing..." : ocrResult ? "Complete" : "Ready"}
            </span>
          </div>

          <div className={styles.fruitSection}>
            <h2 className={styles.fruitHeading}>
              Detected Text
            </h2>
            <p className={styles.description}>
              {ocrResult ? (
                <div className={styles.ocrResult}>
                  {ocrResult.text}
                </div>
              ) : (
                "Upload/Capture an image containing text to perform OCR analysis. Our OCR model will detect and extract text from the image with high accuracy."
              )}
            </p>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {loading && <div className={styles.loading}>Processing image...</div>}
        </div>
      </div>
    </div>
  );
};

export default OcrModel;