import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDevice } from "@/actions/device";
import type { Device } from "@/types";

const updateDeviceFn = async (deviceId: number, device: Partial<Device>) => {
  const result = await updateDevice(deviceId, device);
  if (result.success) {
    return result.data;
  }
  throw new Error(result.message);
};

export const useDeviceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      deviceId,
      values,
    }: {
      deviceId: number;
      values: Partial<Device>;
    }) => updateDeviceFn(deviceId, values),
    onSuccess: (data) => {
      queryClient.setQueryData(["device", data.id], data);
      queryClient.setQueryData(["devices"], (old: Device[]) =>
        old.map((device) => (device.id === data.id ? data : device)),
      );
    },
  });
};
