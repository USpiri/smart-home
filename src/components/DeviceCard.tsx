import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Device } from "@/types";
import { MoreHorizontal, Share2, ToggleLeft, ToggleRight } from "lucide-react";
import { Link } from "react-router";
import { useLocaleDeviceState, useLocalDeviceMutation } from "@/hooks";
import { ConnectionStatus } from "./ConnectionStatus";
import { PinDeviceButton } from "./PinDeviceButton";

interface Props {
  device: Device;
}

export const DeviceCard = ({ device }: Props) => {
  const {
    query: { isLoading, error, data: deviceState },
  } = useLocaleDeviceState(device.ip);
  const { onMutation, offMutation } = useLocalDeviceMutation(device.ip);

  return (
    <article className="border-border rounded-md border px-4 py-3">
      <header className="flex items-center justify-between gap-2">
        <Link to={`/devices/${device.id}`} className="flex items-center gap-2">
          {deviceState?.status === "on" ? (
            <ToggleRight className="size-4 text-emerald-500" />
          ) : (
            <ToggleLeft className="size-4" />
          )}
          <h2 className="font-mono text-lg font-bold">{device.name}</h2>
          <ConnectionStatus
            size="sm"
            status={
              isLoading ? "connecting" : error ? "disconnected" : "connected"
            }
          />
        </Link>
        <Switch
          className="data-[state=checked]:bg-emerald-500"
          checked={deviceState?.status === "on"}
          onCheckedChange={() => {
            if (deviceState?.status === "on") {
              offMutation.mutate();
            } else {
              onMutation.mutate();
            }
          }}
        />
      </header>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-muted-foreground font-mono text-xs">{device.type}</p>
        <div className="flex items-center gap-2">
          <PinDeviceButton deviceId={device.id} />
          <Button variant="outline" size="icon" className="size-7">
            <Share2 className="size-3" />
          </Button>
          <Button variant="outline" size="icon" className="size-7" asChild>
            <Link to={`/devices/${device.id}`}>
              <MoreHorizontal className="size-3" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
