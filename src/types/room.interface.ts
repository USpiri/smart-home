import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { Device } from "./device.interface";
import type { RoomSchema } from "@/lib/db";

export type Room = InferSelectModel<typeof RoomSchema>;
export type RoomInsert = InferInsertModel<typeof RoomSchema>;

export type RoomWithDevices = Room & {
  devices: Device[];
};
