import { RoomsList } from "@/features/rooms/components/RoomsList";
import type { Room } from "@/types";

interface Props {
  data: Room[];
}

export const PinedRoomsList = ({ data }: Props) => {
  return <RoomsList rooms={data} />;
};
