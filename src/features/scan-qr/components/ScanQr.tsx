import { Button } from "@/components/ui/button";
import { Camera, Check, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQrScanner } from "@/hooks";
import { useState } from "react";
import { validateQr, type QRData } from "@/lib/validation";

interface Props {
  onScan?: (data: QRData) => void;
}

export const ScanQr = ({ onScan }: Props) => {
  const [scanStatus, setScanStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    isLoading,
    startScanning,
    stopScanning,
    videoRef,
    isScanning,
    isRecording,
  } = useQrScanner({
    onScan: (code) => {
      const parsed = JSON.parse(code);
      const validation = validateQr(parsed);
      if (validation.valid) {
        setScanStatus("success");
        onScan?.(validation.data!);
      } else {
        setScanStatus("error");
        setErrorMessage("Invalid QR data");
      }
    },
    onError: (error) => {
      setScanStatus("error");
      setErrorMessage(error || "An unknown error occurred");
    },
  });

  const handleStartScanning = () => {
    setScanStatus("scanning");
    startScanning();
  };

  return (
    <>
      <div className="border-border relative h-full w-full overflow-hidden rounded border border-dashed">
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            className={cn(
              "size-full rounded object-cover",
              (!isRecording || scanStatus !== "scanning") && "hidden",
            )}
          />
        </div>

        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}

        {scanStatus === "idle" && (
          <div className="flex h-full w-full items-center justify-center">
            <Camera className="text-muted-foreground size-10" />
          </div>
        )}

        {scanStatus === "success" && (
          <div className="flex h-full w-full items-center justify-center">
            <Check className="size-16 animate-pulse text-emerald-400" />
          </div>
        )}

        {scanStatus === "error" && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <XCircle className="size-16 animate-pulse text-red-400" />
            <p className="text-sm text-red-400">{errorMessage}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 *:flex-1">
        <Button
          onClick={handleStartScanning}
          disabled={isLoading || isScanning}
        >
          {isScanning ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Scanning...
            </>
          ) : (
            "Start Scanning"
          )}
        </Button>
        <Button
          onClick={stopScanning}
          variant="secondary"
          disabled={!isRecording}
        >
          Stop Scanning
        </Button>
      </div>
    </>
  );
};
