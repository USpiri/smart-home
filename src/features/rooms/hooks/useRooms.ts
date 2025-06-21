import { getRooms } from "@/actions/room";
import { useQuery } from "@tanstack/react-query";

const getRoomsFn = async () => {
  const result = await getRooms();
  if (result.success) {
    return result.data;
  }
  return [];
};

export const useRooms = () => {
  const query = useQuery({
    queryKey: ["rooms"],
    queryFn: getRoomsFn,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return { query };
};
