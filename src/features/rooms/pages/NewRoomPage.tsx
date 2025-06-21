import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { RoomForm } from "../components/RoomForm";
import { useRooms } from "../hooks";

export const NewRoomPage = () => {
  const { roomId } = useParams();
  const {
    query: { data: rooms, isLoading },
  } = useRooms();

  const room = rooms?.find((room) => room.id === Number(roomId));

  return (
    <main className="container mx-auto grid w-full grid-rows-[auto_1fr] p-4 lg:max-w-4xl">
      <div className="flex items-center justify-between">
        <header>
          <div className="flex items-center gap-2">
            <Link to="/rooms">
              <Button variant="ghost" size="icon" className="size-8">
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {roomId ? "Edit Room" : "New Room"}
            </h1>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            {roomId ? "Edit a room" : "Add a new room to your home"}
          </p>
        </header>
      </div>
      <div className="mt-10">
        {isLoading ? <div>Loading...</div> : <RoomForm room={room} />}
      </div>
    </main>
  );
};
