"use client";

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/FreshnessModel.module.css';
import axios from 'axios';
import Webcam from 'react-webcam';

const API_URL = 'http://13.203.99.136/';

const CameraComponent = ({ onCapture, onClose }) => {
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
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
      setCapturedImage(imageSrc);
      onCapture(imageSrc);
      setCapturing(false);
    }
  }, [webcamRef, onCapture]);

  const startCapture = () => {
    setCapturing(true);
  };

  const stopCapture = () => {
    setCapturing(false);
  };

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
              <button onClick={startCapture} className={styles.startButton}>
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
              <button onClick={stopCapture} className={styles.stopButton}>
                Cancel
              </button>
            </>
          )}
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        </div>

        {capturedImage && (
          <div className={styles.capturedImagePreview}>
            <Image 
              src={capturedImage} 
              alt="Captured" 
              layout="fill" 
              objectFit="contain" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

const FreshnessModel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [tableData, setTableData] = useState([]);

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
      detectFruit(file);
    }
  };

  const handleCameraCapture = (image) => {
    setSelectedImage(image);
    const capturedFile = base64ToFile(image, 'captured-image.jpg');
    detectFruit(capturedFile);
    setShowCamera(false);
  };

  useEffect(() => {
    // Fetch table data on load
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/fetch-data'); // Replace with your API endpoint
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };
    fetchData();
  }, []);

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
      setQuantity(1);
      // Add new data to the table
      const newEntry = {
        timestamp: new Date().toISOString(),
        produce: response.data.fruit_class,
        freshness: `${(response.data.confidence * 100).toFixed(2)}%`,
        expectedLifeSpan: response.data.shelf_life.estimated_days,
      };
      setTableData((prev) => [newEntry, ...prev]);

      // Save new entry to the database
      await axios.post('/api/add-data', newEntry);

      } catch (err) {
      console.error('Error detecting fruit:', err);
      setError('An error occurred while detecting the fruit. Please try again.');
      setQuantity(0);
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

          {/* Rest of the component remains the same as in your previous implementation */}
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
          {/* Section 2: History */}
    <div className={styles.historyContainer}>
      <h2 className={styles.historyHeading}>History</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Timestamp</th>
              <th>Produce (Good/Bad/Mixed)</th>
              <th>Confidence</th>
              <th>Expected Life Span (Days)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(row.timestamp).toLocaleString()}</td>
                  <td>{row.produce}</td>
                  <td>{row.freshness}</td>
                  <td>{row.expectedLifeSpan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
};

export default FreshnessModel ;