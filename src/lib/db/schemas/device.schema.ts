import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../utils";
import { RoomSchema } from "./room.schema";
import { relations } from "drizzle-orm";

export const DeviceSchema = sqliteTable("device", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  type: text("type").notNull(),
  ...timestamps,

  roomId: integer("room_id").references(() => RoomSchema.id),
});

export const DeviceSchemaRelations = relations(DeviceSchema, ({ one }) => ({
  room: one(RoomSchema, {
    fields: [DeviceSchema.roomId],
    references: [RoomSchema.id],
  }),
}));
