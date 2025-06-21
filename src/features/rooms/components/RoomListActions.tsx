import { Button } from "@/components/ui/button";
import { Pencil, Pin, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDeleteRoom } from "../hooks";

interface Props {
  roomId: number;
}

export const RoomListActions = ({ roomId }: Props) => {
  const { mutate: deleteRoom } = useDeleteRoom();

  const handleDeleteRoom = () => {
    deleteRoom(roomId);
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="size-7"
        asChild
      >
        <div>
          <Pin className="size-3.5" />
        </div>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteRoom();
        }}
        className="size-7"
        asChild
      >
        <div>
          <Trash2 className="size-3.5" />
        </div>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="size-7"
        asChild
      >
        <Link to={`/rooms/${roomId}/edit`}>
          <Pencil className="size-3.5" />
        </Link>
      </Button>
    </div>
  );
};
