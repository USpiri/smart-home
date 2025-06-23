import { createActionResponse } from "@/lib/actions/create";
import { db } from "@/lib/db";

export const getDevicesList = async (ids: number[]) => {
  try {
    const result = await db.query.DeviceSchema.findMany({
      where: (device, { inArray }) => inArray(device.id, ids),
    });
    return createActionResponse.success(result);
  } catch (error) {
    return createActionResponse.error("Failed to get devices list", error);
  }
};
