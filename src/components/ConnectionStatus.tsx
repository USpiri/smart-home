import { cn } from "@/lib/utils";
import { Wifi, WifiHigh, WifiLow, WifiOff, WifiZero } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  status: "connected" | "disconnected" | "connecting";
  size?: "sm" | "default";
}

export const ConnectionStatus = ({ status, size = "default" }: Props) => {
  if (status === "connected") {
    return (
      <Wifi
        className={cn("size-5 text-emerald-300", size === "sm" && "size-4")}
      />
    );
  }

  if (status === "disconnected") {
    return (
      <WifiOff
        className={cn("size-5 text-red-300", size === "sm" && "size-4")}
      />
    );
  }

  return <ConnectingAnimation status={status} size={size} />;
};

const steps = [WifiZero, WifiLow, WifiHigh, Wifi];

const ConnectingAnimation = ({ status, size = "default" }: Props) => {
  const [animationStep, setAnimationStep] = useState(0);
  const Step = steps[animationStep];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "connecting") {
      interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 4);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <Step className={cn("size-5 text-gray-500", size === "sm" && "size-4")} />
  );
};
