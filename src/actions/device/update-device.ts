import { createActionResponse } from "@/lib/actions/create";
import { db, DeviceSchema } from "@/lib/db";
import type { Device } from "@/types";
import { eq } from "drizzle-orm";

export const updateDevice = async (
  deviceId: number,
  device: Partial<Device>,
) => {
  try {
    const result = await db
      .update(DeviceSchema)
      .set(device)
      .where(eq(DeviceSchema.id, deviceId))
      .returning();
    return createActionResponse.success(result[0]);
  } catch (error) {
    return createActionResponse.error(
      "Failed to update device",
      error as string,
    );
  }
};
