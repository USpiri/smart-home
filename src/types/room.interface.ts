import type { Device } from "./device.interface";

export interface Room {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomWithDevices extends Room {
  devices: Device[];
}
