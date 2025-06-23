import { Loader2 } from "lucide-react";
import { Link } from "react-router";
import { PinedRoomsList } from "../components/PinedRoomsList";
import { PinedDeviceList } from "../components/PinnedDeviceList";
import { usePinedDevices, usePinedRooms } from "../hooks";
import { Button } from "@/components/ui/button";

export const HomePage = () => {
  const {
    query: { data: rooms, isLoading: roomsLoading },
  } = usePinedRooms();
  const {
    query: { data: devices, isLoading: devicesLoading },
  } = usePinedDevices();

  return (
    <main className="container mx-auto grid w-full grid-rows-[auto_1fr] p-4 lg:max-w-4xl">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-2xl font-bold">Home</h1>
          <p className="text-muted-foreground mt-1 text-sm">Welcome!</p>
        </header>
      </div>
      <div className="mt-8 space-y-8">
        {roomsLoading ||
          (devicesLoading && (
            <div className="text-muted-foreground flex items-center justify-center">
              <Loader2 className="size-6 animate-spin" />
              <p className="ml-2 text-sm">Loading...</p>
            </div>
          ))}
        {rooms || devices ? (
          <>
            {devices && devices.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-lg font-bold">Pinned Devices</h2>
                <PinedDeviceList data={devices ?? []} />
              </section>
            )}
            {rooms && rooms.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-lg font-bold">Pinned Rooms</h2>
                <PinedRoomsList data={rooms ?? []} />
              </section>
            )}
          </>
        ) : (
          <div className="text-muted-foreground grid grid-cols-2 gap-2">
            <Button variant="outline" asChild>
              <Link to="/rooms">Rooms</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/devices">Devices</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};
