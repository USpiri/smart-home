import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { DeviceList } from "@/components/DeviceList";
import type { RoomWithDevices } from "@/types";
import { House } from "lucide-react";
import { RoomListActions } from "./RoomListActions";

interface Props {
  rooms: RoomWithDevices[];
}

export const RoomsList = ({ rooms }: Props) => {
  return (
    <Accordion type="single" collapsible>
      {rooms.map((room) => (
        <AccordionItem key={room.id} value={room.id.toString()}>
          <AccordionTrigger className="items-center py-3">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <House className="size-4" />
                <span>{room.name}</span>
              </div>
              <RoomListActions roomId={room.id} />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground text-sm">
              {room.description}
              {!room.description && !room.devices && <span>Nothing here</span>}
            </p>
            {room.devices && room.devices.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium">Devices</h3>
                <DeviceList devices={room.devices} />
              </div>
            )}
            {room.devices && room.devices.length === 0 && (
              <div className="mt-4">
                <p className="text-muted-foreground text-sm">
                  No devices in this room
                </p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
