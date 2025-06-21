import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDevice } from "@/actions/device/create-device";
import { useNavigate } from "react-router";
import type { Device } from "@/types";
import { useDeviceMutation } from "../hooks/useDeviceMutatios";

const formSchema = z.object({
  ip: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(["switch"]),
  roomId: z.number().optional(),
});

interface Props {
  device?: Device;
}

// TODO: Add device types and rooms

export const DeviceForm = ({ device }: Props) => {
  const navigate = useNavigate();
  const { mutate: updateDevice } = useDeviceMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ip: device?.ip ?? "",
      name: device?.name ?? "",
      type: (device?.type as "switch") ?? "switch",
      description: device?.description ?? undefined,
      roomId: device?.roomId ?? undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (device) {
      updateDevice(
        {
          deviceId: device.id,
          values,
        },
        {
          onSuccess: () => {
            navigate(`/devices/${device.id}`);
          },
        },
      );
      return;
    }
    const result = await createDevice(values);
    if (result.success) {
      navigate("/devices");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between gap-4"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 items-start gap-4">
            <FormField
              control={form.control}
              name="ip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device IP Address *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="192.000.0.0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="switch">Switch</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Device Name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Living Room Light" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Device Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Living Room Light" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roomId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="text-muted-foreground px-3 py-2 text-sm">
                      There are no rooms at the moment
                    </div>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
