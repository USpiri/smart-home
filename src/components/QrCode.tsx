import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { cn } from "@/lib/utils";

interface Props {
  data: string | object;
  size?: number;
  className?: string;
}

export const QrCode = ({ data, size = 200, className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (canvasRef.current) {
        try {
          const qrData = typeof data === "string" ? data : JSON.stringify(data);
          await QRCode.toCanvas(canvasRef.current, qrData, {
            width: size,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#FFFFFF",
            },
          });
        } catch (error) {
          console.error("Error generating QR code:", error);
        }
      }
    };

    generateQRCode();
  }, [data, size]);

  return <canvas ref={canvasRef} className={cn("h-full w-full", className)} />;
};
