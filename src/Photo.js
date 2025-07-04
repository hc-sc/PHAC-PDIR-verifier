import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Alert } from '@mui/material';
import config from './lib/config.js';
import QrScanner from 'qr-scanner';
import { useLanguage } from './lib/LanguageContext';
import { 
  isMobileDevice, 
  getMobileCameraConstraints, 
  getMobileScannerOptions, 
  getMobileCameraErrorMessage,
  getMobileStyles 
} from './lib/mobileUtils.js';

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
  const [isMobile, setIsMobile] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('prompt');

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pauseCamera = () => { 
    setPaused(true);
    setError(t('cameraTimeout'));
    if (qrScanner) {
      qrScanner.stop();
    }
  };

  const handleFocus = (event) => {
    // Handle both touch and click events
    const isTouch = event.type === 'touchstart' || event.type === 'touchend';
    const clientX = isTouch ? event.touches?.[0]?.clientX || event.changedTouches?.[0]?.clientX : event.clientX;
    const clientY = isTouch ? event.touches?.[0]?.clientY || event.changedTouches?.[0]?.clientY : event.clientY;

    console.log('Interaction detected!', {
      eventType: event.type,
      clientX,
      clientY,
      target: event.target,
      hasVideo: !!qrScanner?._videoElement,
      isMobile
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
    
    // Calculate the touch/click point relative to the video element
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    console.log('Calculated position:', { x, y });
    
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

  // Check camera permissions
  const checkCameraPermissions = async () => {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const permission = await navigator.permissions.query({ name: 'camera' });
        setCameraPermission(permission.state);
        
        permission.onchange = () => {
          setCameraPermission(permission.state);
        };
      }
    } catch (err) {
      console.log('Permission API not supported');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!haveCamera || paused) return;
  
    const checkCameraAccess = async () => {
      try {
        // Mobile-optimized camera constraints
        const constraints = getMobileCameraConstraints(isMobile);
  
        // First try with ideal constraints
        let stream;
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
        } catch (err) {
          console.log('Falling back to basic constraints');
          // Fallback to basic constraints if ideal ones fail
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: 'environment',
              width: { min: 320 },
              height: { min: 240 }
            } 
          });
        }
  
        stream.getTracks().forEach(track => track.stop());
        setError(null);
      } catch (err) {
        console.error('Camera access error:', err);
        setHaveCamera(false);
        setError(getMobileCameraErrorMessage(err));
        return;
      }
    };
    
    checkCameraAccess();
    checkCameraPermissions();
  
    const videoElement = document.getElementById('video');
    if (!videoElement) return;

    const scannerOptions = getMobileScannerOptions(isMobile);
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
      scannerOptions
    );

    setQrScanner(scanner);

    scanner.start()
      .then(() => {
        console.log('QR Scanner started successfully');
        console.log('Scanner state:', {
          isRunning: scanner._isRunning,
          isDestroyed: scanner._isDestroyed,
          videoElement: scanner._videoElement,
          canvasElement: scanner._canvasElement,
          isMobile
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
  }, [haveCamera, paused, isMobile]);

  useEffect(() => {
    if (paused) {
      setError(t('cameraTimeout'));
    } else {
      setError(null);
    }
  }, [paused, t]);
  
  const styles = getMobileStyles(isMobile);
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('captureTitle')}</h1>
      
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
          style={styles.videoContainer}
          onClick={handleFocus}
          onTouchStart={handleFocus}
          className="camera-interface"
        >
          <video 
            id='video' 
            style={styles.video}
            playsInline // Important for iOS
            muted // Required for autoplay
          />
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

      {/* Mobile-specific instructions */}
      {isMobile && haveCamera && !paused && !isLoading && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          borderRadius: '8px'
        }}>
          <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
            Tap anywhere on the camera view to focus • Hold steady for best results
          </p>
        </div>
      )}
    </div>
  );
}
