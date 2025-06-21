import { createActionResponse } from "@/lib/actions/create";
import { db, RoomSchema } from "@/lib/db";
import type { RoomInsert } from "@/types";

export const createRoom = async (room: RoomInsert) => {
  try {
    const result = await db.insert(RoomSchema).values(room).returning();
    return createActionResponse.success(result[0]);
  } catch (error) {
    return createActionResponse.error("Failed to create room", error);
  }
};
