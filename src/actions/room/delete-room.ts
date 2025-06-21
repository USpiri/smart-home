import { createActionResponse } from "@/lib/actions/create";
import { db, RoomSchema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const deleteRoom = async (roomId: number) => {
  try {
    await db.delete(RoomSchema).where(eq(RoomSchema.id, roomId));
    return createActionResponse.success(roomId);
  } catch (error) {
    return createActionResponse.error("Failed to delete room", error);
  }
};
