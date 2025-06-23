import { getDevicesList } from "@/actions/device";
import { usePinedStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

const getDevicesFn = async (pinedDevices: number[]) => {
  const result = await getDevicesList(pinedDevices);
  if (result.success) {
    return result.data;
  }
  return [];
};

export const usePinedDevices = () => {
  const pinedDevices = usePinedStore((s) => s.pinedDevices);
  const query = useQuery({
    queryKey: ["home", "devices", pinedDevices.join(",")],
    queryFn: () => getDevicesFn(pinedDevices),
    enabled: pinedDevices.length > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return { query };
};
