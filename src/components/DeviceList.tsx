import type { Device } from "@/types";
import { DeviceCard } from "./DeviceCard";

interface Props {
  devices: Device[];
}

export const DeviceList = ({ devices }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {devices.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  );
};
