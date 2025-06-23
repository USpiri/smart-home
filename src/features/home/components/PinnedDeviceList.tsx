import { DeviceList } from "@/components/DeviceList";
import type { Device } from "@/types";

interface Props {
  data: Device[];
}

export const PinedDeviceList = ({ data }: Props) => {
  return <DeviceList devices={data} />;
};
