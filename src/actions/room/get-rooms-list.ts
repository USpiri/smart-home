import { createActionResponse } from "@/lib/actions/create";
import { db } from "@/lib/db";

export const getRoomsList = async (ids: number[]) => {
  try {
    const result = await db.query.RoomSchema.findMany({
      where: (room, { inArray }) => inArray(room.id, ids),
      with: {
        devices: true,
      },
    });
    return createActionResponse.success(result);
  } catch (error) {
    return createActionResponse.error("Failed to get rooms list", error);
  }
};
