import { z } from "zod";

const deviceSchema = z.object({
  name: z.string(),
  type: z.string(),
  ip: z.string(),
});

const roomSchema = z.object({
  name: z.string(),
  icon: z.string(),
  devices: z.array(deviceSchema),
});

const qrDataSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("device"),
    data: deviceSchema,
  }),
  z.object({
    type: z.literal("room"),
    data: roomSchema,
  }),
]);

export type QRData = z.infer<typeof qrDataSchema>;
export function validateQr(data: unknown): {
  valid: boolean;
  data?: QRData;
} {
  const result = qrDataSchema.safeParse(data);

  if (result.success) {
    return { valid: true, data: result.data };
  } else {
    return { valid: false };
  }
}
