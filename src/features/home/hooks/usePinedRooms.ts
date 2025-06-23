import { getRoomsList } from "@/actions/room";
import { usePinedStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

const getRoomsFn = async (pinedRooms: number[]) => {
  const result = await getRoomsList(pinedRooms);
  if (result.success) {
    return result.data;
  }
  return [];
};

export const usePinedRooms = () => {
  const pinedRooms = usePinedStore((s) => s.pinedRooms);
  const query = useQuery({
    queryKey: ["home", "rooms", pinedRooms.join(",")],
    queryFn: () => getRoomsFn(pinedRooms),
    enabled: pinedRooms.length > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return { query };
};
