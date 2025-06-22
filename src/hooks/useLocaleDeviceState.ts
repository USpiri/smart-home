import { useQuery } from "@tanstack/react-query";
import { fetch } from "@tauri-apps/plugin-http";

type DeviceState = {
  status: "on" | "off";
};

const getDeviceState = async (deviceIp: string) => {
  const response = await fetch(`http://${deviceIp}/state`);
  const data = (await response.json()) as DeviceState;
  return data;
};

export const useLocaleDeviceState = (deviceIp?: string) => {
  const query = useQuery({
    queryKey: ["device", "state", deviceIp],
    queryFn: () => getDeviceState(deviceIp!),
    enabled: !!deviceIp,
    retry: false,
    retryOnMount: false,
  });
  return { query };
};
