import { useQuery } from "@tanstack/react-query";

// Switch Device API:
// Base URL: http://<deviceIp>
// GET /state
// POST /on
// POST /off
// POST /toggle

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
  });
  return { query };
};
