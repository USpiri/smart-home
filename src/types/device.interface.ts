import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { DeviceSchema } from "@/lib/db";

export type Device = InferSelectModel<typeof DeviceSchema>;
export type DeviceInsert = InferInsertModel<typeof DeviceSchema>;
