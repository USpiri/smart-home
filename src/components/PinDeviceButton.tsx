import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";
import { usePinned } from "@/hooks";

interface Props {
  deviceId: number;
  btnClassName?: string;
  className?: string;
}

export const PinDeviceButton = ({
  deviceId,
  btnClassName,
  className,
}: Props) => {
  const { isPinedDevice, togglePinDevice } = usePinned();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("size-7", btnClassName)}
      onClick={() => togglePinDevice(deviceId)}
    >
      <Pin
        className={cn(
          "size-3",
          isPinedDevice(deviceId) && "fill-emerald-500 text-emerald-500",
          className,
        )}
      />
    </Button>
  );
};
