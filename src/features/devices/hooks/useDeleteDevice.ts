import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDevice } from "@/actions/device";
import type { Device } from "@/types";

const deleteDeviceFn = async (deviceId: number) => {
  const result = await deleteDevice(deviceId);
  if (result.success) {
    return result.data;
  }
  throw new Error(result.message);
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDeviceFn,
    onSuccess: (data) => {
      queryClient.setQueryData(["devices"], (old: Device[]) =>
        old.filter((device) => device.id !== data),
      );
      // Delay removal to avoid race condition
      setTimeout(() => {
        queryClient.removeQueries({ queryKey: ["device", data] });
      }, 500);
    },
  });
};
