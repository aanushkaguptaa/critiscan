"use client";

import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/DetectBrandAndCount.module.css';

const API_URL = 'https://detectronocr.duckdns.org';

export default function DetectBrandAndCount() {
    const [isStreamActive, setIsStreamActive] = useState(false);
    const [status, setStatus] = useState({ message: '', type: '' });
    const [detectionResults, setDetectionResults] = useState('No detections yet');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [testResults, setTestResults] = useState(null);
    const [processedFrameUrl, setProcessedFrameUrl] = useState(null);

    const updateStatus = (message, type) => {
        setStatus({ message, type });
    };

    const requestCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            updateStatus('Camera permission granted. You can now start the camera.', 'success');
        } catch (error) {
            console.error('Camera permission denied:', error);
            updateStatus('Camera permission denied. Please allow access to continue.', 'error');
        }
    };

    const startCamera = async () => {
        try {
            updateStatus('Starting camera...', 'info');
            const response = await fetch(`${API_URL}/start_camera`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const { status, message } = await response.json();
                if (status === 'success') {
                    setIsStreamActive(true);
                    updateStatus('Camera started successfully', 'success');
                    startObjectCountsPolling();
                    if (videoRef.current) {
                        videoRef.current.src = `${API_URL}/video_feed`;
                    }
                } else {
                    throw new Error(message);
                }
            } else {
                throw new Error('Failed to start camera');
            }
        } catch (error) {
            console.error('Error starting camera:', error);
            updateStatus(`Failed to start camera: ${error.message}`, 'error');
        }
    };

    const stopCamera = async () => {
        try {
            const response = await fetch(`${API_URL}/stop_camera`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setIsStreamActive(false);
                updateStatus('Camera stopped successfully', 'success');

                if (videoRef.current && videoRef.current.srcObject) {
                    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                    videoRef.current.srcObject = null;
                }
            } else {
                throw new Error('Failed to stop camera');
            }
        } catch (error) {
            console.error('Error stopping camera:', error);
            updateStatus(`Failed to stop camera: ${error.message}`, 'error');
        }
    };

    const startObjectCountsPolling = () => {
        if (isStreamActive) {
            getObjectCounts();
            setTimeout(startObjectCountsPolling, 1000); // Polling every second
        }
    };

    const getObjectCounts = async () => {
        try {
            const response = await fetch(`${API_URL}/object_summary`);
            if (response.ok) {
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                setDetectionResults(JSON.stringify(data, null, 2));
            } else {
                throw new Error('Failed to fetch object counts');
            }
        } catch (error) {
            console.error('Error fetching object counts:', error);
        }
    };

    const testAPI = async () => {
        try {
            updateStatus('Testing API...', 'info');
            const response = await fetch(`${API_URL}/test_api`);
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};
    
            setTestResults(JSON.stringify(data.results, null, 2));
    
            if (data.status === 'success') {
                const { camera_access, camera_active, models_loaded } = data.results;
                if (!camera_access) {
                    updateStatus('Camera access is denied by the server. Please retry.', 'error');
                } else if (!camera_active) {
                    updateStatus('Camera is inactive on the server. Start the camera.', 'warning');
                } else if (!Object.values(models_loaded).every(Boolean)) {
                    updateStatus('Some models are not loaded. Check the server logs.', 'error');
                } else {
                    updateStatus('API test completed successfully', 'success');
                }
            } else {
                updateStatus('API test completed with errors', 'error');
            }
        } catch (error) {
            console.error('Error testing API:', error);
            updateStatus(`Failed to test API: ${error.message}`, 'error');
        }
    };

    const sendFramesToAPI = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (!canvas || !video) {
            console.error('Canvas or Video reference is not available!');
            return;
        }

        const sendFrame = async () => {
            if (!isStreamActive) return;

            try {
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convert canvas frame to Blob (JPEG)
                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        console.error('Failed to capture image blob!');
                        return;
                    }

                    const formData = new FormData();
                    formData.append('frame', blob, 'frame.jpg');

                    try {
                        const response = await fetch(`${API_URL}/video_feed`, {
                            method: 'POST',
                            body: formData,
                        });

                        if (!response.ok) {
                            const errorText = await response.text();
                            console.error('Server error:', errorText);
                            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                        }

                        const data = await response.json();

                        // Log the full response data to the console
                        console.log('Response from server:', data);

                        // Extract the processed frame and update state
                        if (data.processed_frame) {
                            const processedFrameDataUrl = `data:image/jpeg;base64,${data.processed_frame}`;
                            setProcessedFrameUrl(processedFrameDataUrl);
                        }

                        // Update detection results
                        if (data.object_counts) {
                            setDetectionResults(JSON.stringify(data.object_counts, null, 2));
                        }

                    } catch (fetchError) {
                        console.error('Error sending frame to server:', fetchError);
                    }
                }, 'image/jpeg');
            } catch (error) {
                console.error('Error capturing or processing frame:', error);
            }

            // Reduce the frame sending interval to 50ms (~20 fps)
            setTimeout(sendFrame, 50);
        };

        sendFrame();
    };

    useEffect(() => {
        if (isStreamActive) {
            sendFramesToAPI();
        }
    }, [isStreamActive]);

    useEffect(() => {
        // Load the video stream when the component mounts or isStreamActive changes
        if (videoRef.current && isStreamActive) {
            videoRef.current.load();
        }
    }, [isStreamActive]);

    useEffect(() => {
        // Perform an initial test to check model and camera readiness
        testAPI();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.productGrid}>
                <div className={styles.videoSection}>
                    <div className={styles.uploadArea}>
                        <div className={styles.videoContainer}>
                            <h3>Video Feed</h3>
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className={styles.videoFeed}
                            ></video>
                        </div>
                        <div className={styles.processedFrameContainer}>
                            <h3>Processed Frame</h3>
                            {processedFrameUrl ? (
                                <img
                                    src={processedFrameUrl}
                                    alt="Processed Frame"
                                    className={styles.processedFrame}
                                    width="640"
                                    height="480"
                                />
                            ) : (
                                <div className={styles.placeholder}>
                                    Processed frame will appear here.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hidden Canvas for Frame Processing */}
                    <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />

                    <div className={styles.controls}>
                        <button onClick={requestCameraPermission} className={styles.testBtn}>
                            Request Camera Permission
                        </button>
                        <button onClick={startCamera} className={styles.startBtn}>
                            Start Camera
                        </button>
                        <button onClick={stopCamera} className={styles.stopBtn}>
                            Stop Camera
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