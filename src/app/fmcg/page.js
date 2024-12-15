"use client";

import { useState, useEffect } from 'react';
import styles from '../../styles/DetectBrandAndCount.module.css';
import axios from 'axios';

const API_URL = 'https://realtimeocr.duckdns.org';


export default function DetectBrandAndCount() {
    const [isStreamActive, setIsStreamActive] = useState(false);
    const [status, setStatus] = useState({ message: '', type: '' });
    const [detectionResults, setDetectionResults] = useState('No detections yet');
    const [videoFeedSrc, setVideoFeedSrc] = useState('');
    const [capturedImage, setCapturedImage] = useState('');
    const [testResults, setTestResults] = useState(null);

    const updateStatus = (message, type) => {
        setStatus({ message, type });
    };

    async function startCamera() {
        try {
            const response = await axios.post(`${API_URL}/start_camera`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 5000 // 5 second timeout
            });
            
            if (response.status === 200) {
                updateStatus('Camera started successfully', 'success');
                setVideoFeedSrc(`${API_URL}/video_feed?t=${new Date().getTime()}`);
            }
        } catch (error) {
            console.error('Detailed error:', error);
            
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server responded with error:', error.response.data);
                updateStatus(`Server error: ${error.response.data.message}`, 'error');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                updateStatus('No response from server. Check server status.', 'error');
            } else {
                // Something happened in setting up the request
                console.error('Error setting up request:', error.message);
                updateStatus(`Network error: ${error.message}`, 'error');
            }
        }
    }

    const stopCamera = async () => {
        try {
            const response = await fetch(`${API_URL}/stop_camera`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                setVideoFeedSrc('');
                setIsStreamActive(false);
                updateStatus('Camera stopped successfully', 'success');
            } else {
                throw new Error('Failed to stop camera');
            }
        } catch (error) {
            console.error('Error:', error);
            updateStatus(`Failed to stop camera: ${error.message}`, 'error');
        }
    };

    const captureImage = () => {
        setCapturedImage(videoFeedSrc);
        setVideoFeedSrc('');
        updateStatus('Image captured successfully', 'success');
    };

    const getObjectCounts = async () => {
        try {
            const response = await fetch(`${API_URL}/object_summary`);
            const data = await response.json();
            setDetectionResults(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error fetching object counts:', error);
        }
    };

    const startObjectCountsPolling = () => {
        if (isStreamActive) {
            getObjectCounts();
            setTimeout(startObjectCountsPolling, 1000);
        }
    };

    const testAPI = async () => {
        try {
            updateStatus('Testing API...', 'info');
            const response = await fetch(`${API_URL}/test_api`);
            const data = await response.json();
            
            setTestResults(JSON.stringify(data, null, 2));
            
            if (data.status === 'success') {
                updateStatus('API test completed successfully', 'success');
            } else {
                updateStatus('API test completed with errors', 'error');
            }
        } catch (error) {
            console.error('Error testing API:', error);
            updateStatus(`Failed to test API: ${error.message}`, 'error');
        }
    };

    useEffect(() => {
        const checkNetworkStatus = async () => {
            try {
                // Check if the server is reachable
                const response = await fetch(`${API_URL}/`, {
                    method: 'GET',
                    mode: 'no-cors' // This helps bypass CORS for initial check
                });
                console.log('Network check response:', response);
            } catch (error) {
                console.error('Network error details:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
            }
        };
    
        checkNetworkStatus();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.productGrid}>
                <div className={styles.videoSection}>
                    <div className={styles.uploadArea}>
                        {videoFeedSrc && (
                            <img 
                                src={videoFeedSrc} 
                                alt="Video Feed" 
                                className={styles.videoFeed} 
                            />
                        )}
                        {capturedImage && (
                            <img 
                                src={capturedImage} 
                                alt="Captured Image" 
                                className={styles.videoFeed} 
                            />
                        )}
                    </div>

                    <div className={styles.controls}>
                        <button onClick={startCamera} className={styles.startBtn}>
                            Start Camera
                        </button>
                        <button onClick={stopCamera} className={styles.stopBtn}>
                            Stop Camera
                        </button>
                        <button onClick={captureImage} className={styles.captureBtn}>
                            Capture Image
                        </button>
                        <button onClick={testAPI} className={styles.testBtn}>
                            Test API
                        </button>
                    </div>
                </div>

                <div className={styles.detailsSection}>
                    {status.message && (
                        <div className={styles.status}>
                            {status.message}
                        </div>
                    )}

                    <div className={styles.objectCounts}>
                        <h3>Object Detection Results:</h3>
                        <pre>{detectionResults}</pre>
                    </div>

                    {testResults && (
                        <div className={styles.testResults}>
                            <h3>API Test Results:</h3>
                            <pre>{testResults}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}