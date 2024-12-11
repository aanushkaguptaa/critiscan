"use client";

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import styles from '../styles/OcrModel.module.css'; // We'll reuse most styles
import axios from 'axios';
import Webcam from 'react-webcam';

const API_URL = 'http://13.203.99.136/';

const cardData = [
  { title: "Powerful OCR Technology", description: "Leverages the Qwen2 model to accurately extract textual information from product labels, including names, categories, quantities, and expiry dates." },
  { title: "Comprehensive Data Extraction", description: "Capable of analyzing packaged goods, providing detailed insights." },
  { title: "Real-Time Processing Capability", description: "Users can scan products using their device's camera or upload images for immediate analysis, ensuring quick access to information." },
  { title: "Structured Output Format", description: "Results are organized into a structured format that includes all relevant product details, making it easy to read and understand." },
  { title: "Detection of Products", description: "Detects the product name, brand, quantity, expiry date, and MRP from the image along with the frequency of the product in the image." },
  { title: "Regular Expression Patterns for Accuracy", description: "Utilizes regex patterns to identify and extract specific information from text output, ensuring high precision in data retrieval." },
];

const CameraComponent = ({ onCapture, onClose }) => {
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState("user");

  const videoConstraints = {
    width: { min: 640, ideal: 1920, max: 1920 },
    height: { min: 480, ideal: 1080, max: 1080 },
    facingMode: facingMode
  };

  const toggleCamera = () => {
    setFacingMode(prevMode => 
      prevMode === "user" ? "environment" : "user"
    );
  };

  const handleCapture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
      setCapturing(false);
    }
  }, [webcamRef, onCapture]);

  return (
    <div className={styles.cameraModal}>
      <div className={styles.cameraContainer}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          mirrored={facingMode === "user"}
        />
        
        <div className={styles.cameraControls}>
          {!capturing ? (
            <>
              <button onClick={() => setCapturing(true)} className={styles.startButton}>
                Start Capture
              </button>
              <button onClick={toggleCamera} className={styles.startButton}>
                Switch Camera
              </button>
            </>
          ) : (
            <>
              <button onClick={handleCapture} className={styles.captureButton}>
                Capture
              </button>
              <button onClick={() => setCapturing(false)} className={styles.stopButton}>
                Cancel
              </button>
            </>
          )}
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

const OcrModel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mime });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      performOcr(file);
    }
  };

  const handleCameraCapture = (image) => {
    setSelectedImage(image);
    const capturedFile = base64ToFile(image, 'captured-image.jpg');
    performOcr(capturedFile);
    setShowCamera(false);
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

  return (
    <>
      <div className={styles.container}>
        {showCamera && (
          <CameraComponent
            onCapture={handleCameraCapture}
            onClose={() => setShowCamera(false)}
          />
        )}
        
        <div className={styles.productGrid}>
          <div className={styles.imageSection}>
            <div className={styles.uploadArea}>
              {selectedImage ? (
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
                onClick={() => setShowCamera(true)}
                disabled={loading}
              >
                <Image src="/camera-white.svg" alt="Camera" width={20} height={20} />
                <span>Open Camera</span>
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

            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <Image 
                  src="/brand.svg" 
                  alt="Brand" 
                  width={47} 
                  height={25}
                  className={styles.brandIcon} 
                />
                <div>
                  <h3>Brand</h3>
                  <p>{ocrResult ? ocrResult.brand || 'N/A' : 'N/A'}</p>
                </div>
              </div>

              <div className={styles.metricCard}>
                <Image 
                  src="/bestbefore.svg" 
                  alt="Best Before" 
                  width={47} 
                  height={25}
                  className={styles.bestBeforeIcon} 
                />
                <div>
                  <h3>Best Before</h3>
                  <p>{ocrResult ? ocrResult.best_before || 'N/A' : 'N/A'}</p>
                </div>
              </div>

              <div className={styles.metricCard}>
                <Image 
                  src="/quantity.svg" 
                  alt="Weight" 
                  width={44} 
                  height={24}
                  className={styles.weightIcon} 
                />
                <div>
                  <h3>Weight</h3>
                  <p>{ocrResult ? ocrResult.weight || 'N/A' : 'N/A'}</p>
                </div>
              </div>

              <div className={styles.metricCard}>
                <Image src="/drop.svg" alt="Confidence" width={24} height={24} />
                <div>
                  <h3>Confidence</h3>
                  <p>{ocrResult ? `${Math.round(ocrResult.confidence * 100)}%` || 'N/A' : 'N/A'}</p>
                </div>
              </div>

              <div className={styles.metricCard}>
                <Image src="/calender.svg" alt="Expiry Date" width={24} height={24} />
                <div>
                  <h3>Expiry Date</h3>
                  <p>{ocrResult ? ocrResult.expiry_date || 'N/A' : 'N/A'}</p>
                </div>
              </div>

              <div className={styles.metricCard}>
                <Image src="/price.svg" alt="MRP" width={24} height={24} />
                <div>
                  <h3>MRP</h3>
                  <p>{ocrResult ? ocrResult.mrp || 'N/A' : 'N/A'}</p>
                </div>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {loading && <div className={styles.loading}>Processing image...</div>}
          </div>
        </div>
      </div>

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

export default OcrModel;