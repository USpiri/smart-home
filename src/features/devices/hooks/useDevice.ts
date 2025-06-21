import { getDevice } from "@/actions/device";
import { useQuery } from "@tanstack/react-query";

const getDeviceFn = async (deviceId: number) => {
  const result = await getDevice(deviceId);
  if (result.success) {
    return result.data;
  }
  throw new Error(result.message);
};

export const useDevice = (deviceId: number) => {
  const query = useQuery({
    queryKey: ["device", deviceId],
    queryFn: () => getDeviceFn(deviceId),
    enabled: !!deviceId,
  });

  return { query };
};
