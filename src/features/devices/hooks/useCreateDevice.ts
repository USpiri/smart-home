import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDevice } from "@/actions/device";
import type { Device, DeviceInsert } from "@/types";

const createDeviceFn = async (device: DeviceInsert) => {
  const result = await createDevice(device);
  if (result.success) {
    return result.data;
  }
  throw new Error(result.message);
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDeviceFn,
    onSuccess: (data) => {
      queryClient.setQueryData(["device", data.id], data);
      queryClient.setQueryData(["devices"], (old: Device[]) => [...old, data]);
    },
  });
};
