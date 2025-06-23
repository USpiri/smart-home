import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "@/actions/room";
import type { Room } from "@/types";

const deleteRoomFn = async (roomId: number) => {
  const result = await deleteRoom(roomId);
  if (result.success) {
    return result.data;
  }
  throw new Error(result.message);
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoomFn,
    onSuccess: (data) => {
      queryClient.setQueryData(["rooms"], (old: Room[]) =>
        old.filter((room) => room.id !== data),
      );
      // Delay removal to avoid race condition
      //   setTimeout(() => {
      //     queryClient.removeQueries({ queryKey: ["room", data] });
      //   }, 500);
      queryClient.invalidateQueries({ queryKey: ["home", "rooms"] });
    },
  });
};
