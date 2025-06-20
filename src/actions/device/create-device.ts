import { db, DeviceSchema } from "@/lib/db";
import {
  createActionResponse,
  type ActionResponse,
} from "@/lib/actions/create";
import type { Device, DeviceInsert } from "@/types";

export const createDevice = async (
  device: DeviceInsert,
): Promise<ActionResponse<Device>> => {
  try {
    const result = await db.insert(DeviceSchema).values(device).returning();
    return createActionResponse.success(result[0]);
  } catch (error) {
    return createActionResponse.error("Failed to create device", error);
  }
};
