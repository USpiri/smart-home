import { createActionResponse } from "@/lib/actions/create";
import { db, DeviceSchema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const getDevice = async (deviceId: number) => {
  try {
    const result = await db
      .select()
      .from(DeviceSchema)
      .where(eq(DeviceSchema.id, deviceId));

    if (!result) throw new Error("Device not found");

    return createActionResponse.success(result[0]);
  } catch (error) {
    return createActionResponse.error("Failed to get devices", error);
  }
};
