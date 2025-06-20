import type { Room } from "./room.interface";

export interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
  roomId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceWithRoom extends Device {
  room: Room;
}
