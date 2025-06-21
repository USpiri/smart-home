import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Room } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateRoom, useRoomMutation } from "../hooks";
import { useNavigate } from "react-router";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
});

interface Props {
  room?: Room;
}

export const RoomForm = ({ room }: Props) => {
  const navigate = useNavigate();
  const { mutate: updateRoom } = useRoomMutation();
  const { mutate: createRoom } = useCreateRoom();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room?.name ?? "",
      description: room?.description ?? undefined,
      icon: room?.icon ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (room) {
      updateRoom(
        {
          roomId: room.id,
          values,
        },
        {
          onSuccess: () => {
            navigate(`/rooms`);
          },
        },
      );
      return;
    }
    createRoom(values, {
      onSuccess: () => {
        navigate("/rooms");
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between gap-4"
      >
        <div className="space-y-4">
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
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
