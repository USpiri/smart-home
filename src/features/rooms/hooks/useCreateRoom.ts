import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "@/actions/room";
import type { Room, RoomInsert } from "@/types";

const createRoomFn = async (room: RoomInsert) => {
  const result = await createRoom(room);
  if (result.success) {
    return result.data;
  }
  throw new Error(result.message);
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoomFn,
    onSuccess: (data) => {
      //   queryClient.setQueryData(["room", data.id], data);
      queryClient.setQueryData(["rooms"], (old: Room[]) => [...old, data]);
    },
  });
};
