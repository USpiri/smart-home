import { getDevices } from "@/actions/device";
import { useQuery } from "@tanstack/react-query";

const getDevicesFn = async () => {
  const result = await getDevices();
  if (result.success) {
    return result.data;
  }
  return [];
};

export const useDevices = () => {
  const query = useQuery({
    queryKey: ["devices"],
    queryFn: getDevicesFn,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return { query };
};
