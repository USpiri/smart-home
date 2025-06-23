import { useState, useRef, useEffect, useCallback } from "react";
import jsQR from "jsqr";

interface Props {
  onScan?: (code: string) => void;
  onError?: (error: string | null) => void;
}

export const useQrScanner = ({ onScan, onError }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const detectQRCode = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    if (videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA)
      return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context || video.videoWidth === 0 || video.videoHeight === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      stopScanning();
      onScan?.(code.data);
    }
  }, [onScan]);

  const stopScanning = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());

    setIsScanning(false);
    setIsRecording(false);
    setIsLoading(false);
  }, []);

  const handleError = useCallback(
    (error: string | null) => {
      setError(error);
      onError?.(error);
    },
    [onError],
  );

  const startScanning = useCallback(async () => {
    if (!videoRef.current) {
      handleError("Video element not found");
      stopScanning();
      return;
    }

    stopScanning();
    setError(null);
    setIsLoading(true);
    setIsScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
      });
      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        videoRef.current
          ?.play()
          .then(() => {
            setIsRecording(true);
            setIsLoading(false);
            scanIntervalRef.current = setInterval(detectQRCode, 500);
          })
          .catch(() => {
            handleError("Failed to start video playback");
            stopScanning();
          });
      };

      videoRef.current.onerror = () => {
        handleError("Video stream error");
        stopScanning();
      };
    } catch (error) {
      handleError("Failed to access the camera");
      stopScanning();
    }
  }, [handleError, stopScanning, detectQRCode]);

  useEffect(() => {
    return () => stopScanning();
  }, [stopScanning]);

  return {
    isLoading,
    isScanning,
    isRecording,
    videoRef,
    error,
    startScanning,
    stopScanning,
  };
};
