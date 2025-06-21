import { createActionResponse } from "@/lib/actions/create";
import { db } from "@/lib/db";

export const getRooms = async () => {
  try {
    const result = await db.query.RoomSchema.findMany({
      with: {
        devices: true,
      },
    });
    return createActionResponse.success(result);
  } catch (error) {
    return createActionResponse.error("Failed to get rooms", error);
  }
};
