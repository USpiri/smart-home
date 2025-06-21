import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDevice } from "@/actions/device";
import type { Device, RoomWithDevices } from "@/types";

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
      let oldRoomId: number | null = null;

      queryClient.setQueryData(["device", data.id], (old: Device) => {
        oldRoomId = old.roomId;
        return data;
      });
      queryClient.setQueryData(["devices"], (old: Device[]) =>
        old.map((device) => (device.id === data.id ? data : device)),
      );

      // If the device is being removed from a room, update the room's devices
      // and remove the device from the old room's devices
      if (data.roomId && data.roomId !== oldRoomId) {
        queryClient.setQueryData(["rooms"], (old: RoomWithDevices[]) =>
          old.map((room) => {
            if (room.id === data.roomId) {
              return {
                ...room,
                devices: [...(room.devices ?? []), data],
              };
            }
            if (room.id === oldRoomId) {
              return {
                ...room,
                devices: room.devices?.filter(
                  (device) => device.id !== data.id,
                ),
              };
            }
            return room;
          }),
        );
      }
    },
  });
};
