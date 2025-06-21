import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { DeviceSchema } from "./device.schema";

export const RoomSchema = sqliteTable("room", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
});

export const RoomSchemaRelations = relations(RoomSchema, ({ many }) => ({
  devices: many(DeviceSchema),
}));
