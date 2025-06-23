import { Button } from "@/components/ui/button";
import { Pencil, Pin, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDeleteRoom } from "../hooks";
import { usePined } from "@/hooks";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  roomId: number;
}

export const RoomListActions = ({ roomId }: Props) => {
  const { mutate: deleteRoom } = useDeleteRoom();
  const { isPinedRoom, togglePinRoom } = usePined();

  const handleDeleteRoom = () => {
    deleteRoom(roomId, {
      onError: () => {
        toast.error("Failed to delete room", {
          description: "You can't delete a room with devices",
        });
      },
    });
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          togglePinRoom(roomId);
        }}
        className="size-7"
        asChild
      >
        <div>
          <Pin
            className={cn(
              "size-3.5",
              isPinedRoom(roomId) && "fill-emerald-500 text-emerald-500",
            )}
          />
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
