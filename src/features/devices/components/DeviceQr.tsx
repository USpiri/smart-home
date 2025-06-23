import { QrCode } from "@/components/QrCode";
import type { Device } from "@/types";

interface Props {
  device: Device;
}

export const DeviceQr = ({ device }: Props) => {
  const data = {
    type: "device",
    data: {
      name: device.name,
      type: device.type,
      ip: device.ip,
    },
  };
  return <QrCode data={data} size={300} className="rounded" />;
};
