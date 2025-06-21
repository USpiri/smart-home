import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Device } from "@/types";
import { MoreHorizontal, Share2, ToggleLeft } from "lucide-react";
import { Link } from "react-router";

interface Props {
  device: Device;
}

export const DeviceCard = ({ device }: Props) => {
  return (
    <article className="border-border rounded-md border px-4 py-3">
      <header className="flex items-center justify-between gap-2">
        <Link to={`/devices/${device.id}`} className="flex items-center gap-2">
          <ToggleLeft className="size-4" />
          <h2 className="font-mono text-lg font-bold">{device.name}</h2>
          <div className="rounded-full bg-emerald-300 p-1" />
        </Link>
        <Switch className="data-[state=checked]:bg-emerald-500" />
      </header>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-muted-foreground font-mono text-xs">{device.type}</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="size-7">
            <Share2 className="size-3" />
          </Button>
          <Button variant="outline" size="icon" className="size-7" asChild>
            <Link to={`/devices/${device.id}`}>
              <MoreHorizontal className="size-3" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
