import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDevice } from "@/actions/device";
import type { Device, DeviceInsert, RoomWithDevices } from "@/types";

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

      if (data.roomId) {
        queryClient.setQueryData(["rooms"], (old: RoomWithDevices[]) =>
          old.map((room) =>
            room.id === data.roomId
              ? { ...room, devices: [...(room.devices ?? []), data] }
              : room,
          ),
        );
      }
    },
  });
};
