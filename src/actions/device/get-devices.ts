import { createActionResponse } from "@/lib/actions/create";
import { db } from "@/lib/db";

export const getDevices = async () => {
  try {
    const result = await db.query.DeviceSchema.findMany();
    return createActionResponse.success(result);
  } catch (error) {
    return createActionResponse.error("Failed to get devices", error);
  }
};
