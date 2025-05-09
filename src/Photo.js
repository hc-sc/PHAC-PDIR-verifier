import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Alert } from '@mui/material';
import config from './lib/config.js';
import QrScanner from 'qr-scanner';
import { useLanguage } from './lib/LanguageContext';

// Add focus animation keyframes
const focusAnimation = `
  @keyframes focusAnimation {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

// Add the animation styles to the document
const style = document.createElement('style');
style.textContent = focusAnimation;
document.head.appendChild(style);

export default function Photo({ viewData }) {
  const { t } = useLanguage();
  const [haveCamera, setHaveCamera] = useState(true);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qrScanner, setQrScanner] = useState(null);
  const [focusPoint, setFocusPoint] = useState(null);

  const openCameraClick = () => {
    setIsLoading(true);
    const url = 'captureQR.html';
    window.openCameraResult = (shx) => {
      setIsLoading(false);
      if (shx) {
        viewData(shx);
      } else {
        setError(t('noQrCode'));
      }
    };
    window.open(url, 'captureQR', 'width=800,height=600');
  };

  const unPauseCameraClick = () => { 
    setPaused(false);
    setError(null);
    if (qrScanner) {
      qrScanner.start();
    }
  };

  const pauseCamera = () => { 
    setPaused(true);
    setError(t('cameraTimeout'));
    if (qrScanner) {
      qrScanner.stop();
    }
  };

  const handleFocus = (event) => {
    console.log('Tap detected!', {
      eventType: event.type,
      clientX: event.clientX,
      clientY: event.clientY,
      target: event.target,
      hasVideo: !!qrScanner?._videoElement
    });

    if (!qrScanner || !qrScanner._videoElement) {
      console.log('No QR scanner or video element available');
      return;
    }

    const video = qrScanner._videoElement;
    const rect = video.getBoundingClientRect();
    
    console.log('Video element bounds:', {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height
    });
    
    // Calculate the touch point relative to the video element
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    console.log('Calculated tap position:', { x, y });
    
    // Update focus point for visual feedback
    setFocusPoint({ x, y });
    console.log('Focus point set:', { x, y });

    // Try to set focus point on the camera
    const stream = video.srcObject;
    if (stream) {
      const track = stream.getVideoTracks()[0];
      if (track && track.getCapabilities().focusMode) {
        const capabilities = track.getCapabilities();
        console.log('Camera capabilities:', capabilities);
        
        if (capabilities.focusMode.includes('manual')) {
          track.applyConstraints({
            advanced: [{
              focusMode: 'manual',
              focusDistance: 0
            }]
          });
          console.log('Applied manual focus constraints');
        }
      }
    }

    // Clear focus point after animation
    setTimeout(() => {
      console.log('Clearing focus point');
      setFocusPoint(null);
    }, 1000);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!haveCamera || paused) return;
  
    const checkCameraAccess = async () => {
      try {
        // More flexible camera constraints for different devices
        const constraints = {
          video: {
            facingMode: { ideal: 'environment' },
            width: { min: 640, ideal: 1920 },
            height: { min: 480, ideal: 1080 },
            frameRate: { ideal: 30 }
          }
        };
  
        // First try with ideal constraints
        let stream;
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
        } catch (err) {
          console.log('Falling back to basic constraints');
          // Fallback to basic constraints if ideal ones fail
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
        }
  
        stream.getTracks().forEach(track => track.stop());
        setError(null);
        
  
        const videoElement = document.getElementById('video');
        if (!videoElement) return;
  
        const scanner = new QrScanner(
          videoElement,
          result => {
        console.log('QR Scanner result:', result);
        if (result && result.data) {
          console.log('QR Code detected:', result.data);
              try {
            // Check if the QR code data is a valid SHC string
                if (result.data.startsWith('shc:/')) {
              console.log('Valid SHC QR code detected');
                  viewData(result.data);
                } else {
              console.log('Invalid QR code format:', result.data);
                  setError(t('invalidQrCode'));
                }
              } catch (err) {
                console.error('Error processing QR code:', err);
                setError(t('qrCodeError'));
              }
            }
          },
          {
            preferredCamera: 'environment',
            highlightScanRegion: true,
            highlightCodeOutline: true,
            returnDetailedScanResult: true,
            maxScansPerSecond: 2,
        // More flexible scan region calculation
            calculateScanRegion: (video) => {
          const smallestDimension = Math.min(video.videoWidth, video.videoHeight);
          const scanRegionSize = Math.round(smallestDimension * 0.6); // Smaller region for better focus
              return {
            x: Math.round((video.videoWidth - scanRegionSize) / 2),
            y: Math.round((video.videoHeight - scanRegionSize) / 2),
            width: scanRegionSize,
            height: scanRegionSize,
              };
            }
          }
        );
  
        setQrScanner(scanner);
  
    scanner.start()
      .then(() => {
        console.log('QR Scanner started successfully');
        // Test the scanner by logging its state
        console.log('Scanner state:', {
          isRunning: scanner._isRunning,
          isDestroyed: scanner._isDestroyed,
          videoElement: scanner._videoElement,
          canvasElement: scanner._canvasElement
        });
      })
      .catch((err) => {
        console.error('Camera error:', err);
        setHaveCamera(false);
        setError(t('cameraError'));
      });

        const millis = config("cameraPauseTimeoutMillis");
        const timerId = setTimeout(pauseCamera, millis);  

        return () => {
          clearTimeout(timerId);
          scanner.stop();
          scanner.destroy();
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
      } catch (err) {
        console.error('Camera access error:', err);
        setHaveCamera(false);
        setError(t('cameraAccessDenied'));
        return;
      }
    };
    
    checkCameraAccess();
  }, [haveCamera, paused, viewData, t]);

  useEffect(() => {
    if (paused) {
      setError(t('cameraTimeout'));
    } else {
      setError(null);
    }
  }, [paused, t]);
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{t('captureTitle')}</h1>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      )}
      
      {paused && !isLoading && (
        <div style={{ textAlign: 'center' }}>
          <p>{t('cameraPaused')}</p>
          <Button variant='contained' onClick={unPauseCameraClick} sx={{ mt: 2 }}>
            {t('restartCamera')}
          </Button>
        </div>
      )}

      {haveCamera && !paused && !isLoading && (
        <div 
          style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: '600px', 
            margin: '0 auto',
            height: '400px', // Fixed height for the container
            overflow: 'hidden', // Hide overflow
            cursor: 'pointer' // Show pointer cursor to indicate clickable area
          }}
          onClick={handleFocus}
        >
          <video 
            id='video' 
            style={{ 
              width: '100%', 
              height: '100%',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transform: 'scaleX(-1)', // Mirror the video for better UX
              objectFit: 'cover' // Ensure video fills the container
            }}
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '8px',
            pointerEvents: 'none'
          }} />
          {focusPoint && (
            <div
              style={{
                position: 'absolute',
                left: `${focusPoint.x}px`,
                top: `${focusPoint.y}px`,
                width: '80px',
                height: '80px',
                border: '4px solid #fff',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                animation: 'focusAnimation 1s ease-out forwards',
                pointerEvents: 'none',
                zIndex: 1000,
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
        </div>
      )}

      {!haveCamera && !isLoading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button 
            variant='contained' 
            onClick={openCameraClick}
            sx={{ mt: 2 }}
          >
            {t('openCamera')}
          </Button>
        </div>
      )}
    </div>
  );
}
