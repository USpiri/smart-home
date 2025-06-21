import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { useRooms } from "../hooks";
import { RoomsList } from "../components/RoomsList";

export const RoomsPage = () => {
  const {
    query: { data: rooms, isLoading },
  } = useRooms();

  return (
    <main className="container mx-auto w-full space-y-8 p-4 lg:max-w-4xl">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-2xl font-bold">Rooms</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your rooms
          </p>
        </header>
        <Button variant="outline" size="sm" asChild>
          <Link to="/rooms/new">
            <Plus className="size-4" />
            <span>Add Room</span>
          </Link>
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && rooms && rooms.length > 0 && <RoomsList rooms={rooms} />}
      {!isLoading && rooms && rooms.length === 0 && (
        <div className="text-muted-foreground text-sm">
          There are no rooms at the moment
        </div>
      )}
    </main>
  );
};
