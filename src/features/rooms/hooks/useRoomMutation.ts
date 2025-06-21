import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom } from "@/actions/room";
import type { Room, RoomWithDevices } from "@/types";

const updateRoomFn = async (roomId: number, room: Partial<Room>) => {
  const result = await updateRoom(roomId, room);
  if (result.success) {
    return result.data;
  }
  throw new Error(result.message);
};

export const useRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roomId,
      values,
    }: {
      roomId: number;
      values: Partial<Room>;
    }) => updateRoomFn(roomId, values),
    onSuccess: (data) => {
      //   queryClient.setQueryData(["room", data.id], data);
      queryClient.setQueryData(["rooms"], (old: RoomWithDevices[]) =>
        old.map((room) =>
          room.id === data.id ? { ...data, devices: room.devices } : room,
        ),
      );
    },
  });
};
