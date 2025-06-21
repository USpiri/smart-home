import { createActionResponse } from "@/lib/actions/create";
import { db, DeviceSchema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const deleteDevice = async (deviceId: number) => {
  try {
    await db.delete(DeviceSchema).where(eq(DeviceSchema.id, deviceId));
    return createActionResponse.success(deviceId);
  } catch (error) {
    return createActionResponse.error("Failed to delete device", error);
  }
};
