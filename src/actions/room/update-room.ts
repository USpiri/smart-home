import { createActionResponse } from "@/lib/actions/create";
import { db, RoomSchema } from "@/lib/db";
import type { Room } from "@/types";
import { eq } from "drizzle-orm";

export const updateRoom = async (roomId: number, room: Partial<Room>) => {
  try {
    const result = await db
      .update(RoomSchema)
      .set(room)
      .where(eq(RoomSchema.id, roomId))
      .returning();
    return createActionResponse.success(result[0]);
  } catch (error) {
    return createActionResponse.error("Failed to update room", error as string);
  }
};
