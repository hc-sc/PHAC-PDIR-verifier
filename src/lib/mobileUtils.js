// Mobile utility functions for better mobile experience

/**
 * Detect if the current device is mobile
 * @returns {boolean} True if mobile device
 */
export const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  return mobileRegex.test(userAgent.toLowerCase());
};

/**
 * Detect if the current device is iOS
 * @returns {boolean} True if iOS device
 */
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

/**
 * Detect if the current device is Android
 * @returns {boolean} True if Android device
 */
export const isAndroid = () => {
  return /Android/.test(navigator.userAgent);
};

/**
 * Get mobile-optimized camera constraints
 * @param {boolean} isMobile - Whether device is mobile
 * @returns {Object} Camera constraints object
 */
export const getMobileCameraConstraints = (isMobile = false) => {
  if (!isMobile) {
    return {
      video: {
        facingMode: { ideal: 'environment' },
        width: { min: 640, ideal: 1920 },
        height: { min: 480, ideal: 1080 },
        frameRate: { ideal: 30 }
      }
    };
  }

  return {
    video: {
      facingMode: { ideal: 'environment' },
      width: { min: 320, ideal: 1280, max: 1920 },
      height: { min: 240, ideal: 720, max: 1080 },
      frameRate: { ideal: 30, max: 30 },
      aspectRatio: { ideal: 16/9 },
      resizeMode: 'crop-and-scale'
    }
  };
};

/**
 * Get mobile-optimized QR scanner options
 * @param {boolean} isMobile - Whether device is mobile
 * @returns {Object} QR scanner options
 */
export const getMobileScannerOptions = (isMobile = false) => {
  return {
    preferredCamera: 'environment',
    highlightScanRegion: true,
    highlightCodeOutline: true,
    returnDetailedScanResult: true,
    maxScansPerSecond: isMobile ? 1 : 2,
    calculateScanRegion: (video) => {
      const smallestDimension = Math.min(video.videoWidth, video.videoHeight);
      const scanRegionSize = Math.round(smallestDimension * (isMobile ? 0.7 : 0.6));
      return {
        x: Math.round((video.videoWidth - scanRegionSize) / 2),
        y: Math.round((video.videoHeight - scanRegionSize) / 2),
        width: scanRegionSize,
        height: scanRegionSize,
      };
    }
  };
};

/**
 * Handle mobile-specific camera errors
 * @param {Error} error - Camera error
 * @returns {string} User-friendly error message
 */
export const getMobileCameraErrorMessage = (error) => {
  switch (error.name) {
    case 'NotAllowedError':
      return 'Camera access denied. Please allow camera access in your browser settings.';
    case 'NotFoundError':
      return 'No camera found on this device.';
    case 'NotReadableError':
      return 'Camera is already in use by another application.';
    case 'OverconstrainedError':
      return 'Camera does not support the requested settings.';
    case 'SecurityError':
      return 'Camera access blocked due to security restrictions.';
    case 'AbortError':
      return 'Camera access was aborted.';
    default:
      return 'Failed to access camera. Please try again.';
  }
};

/**
 * Check if device supports camera permissions API
 * @returns {boolean} True if supported
 */
export const supportsCameraPermissions = () => {
  return navigator.permissions && navigator.permissions.query;
};

/**
 * Request camera permissions
 * @returns {Promise<string>} Permission state
 */
export const requestCameraPermissions = async () => {
  if (!supportsCameraPermissions()) {
    return 'prompt';
  }

  try {
    const permission = await navigator.permissions.query({ name: 'camera' });
    return permission.state;
  } catch (error) {
    console.log('Permission API not supported:', error);
    return 'prompt';
  }
};

/**
 * Get mobile-specific styles
 * @param {boolean} isMobile - Whether device is mobile
 * @returns {Object} Style object
 */
export const getMobileStyles = (isMobile = false) => {
  return {
    container: {
      padding: isMobile ? '10px' : '20px',
      maxWidth: '800px',
      margin: '0 auto',
      minHeight: isMobile ? '100vh' : 'auto'
    },
    title: {
      fontSize: isMobile ? '1.5rem' : '2rem'
    },
    videoContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: isMobile ? '100%' : '600px',
      margin: '0 auto',
      height: isMobile ? '60vh' : '400px',
      overflow: 'hidden',
      cursor: 'pointer',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
    },
    video: {
      width: '100%',
      height: '100%',
      borderRadius: '12px',
      objectFit: 'cover',
      transform: isMobile ? 'none' : 'scaleX(-1)'
    }
  };
}; 