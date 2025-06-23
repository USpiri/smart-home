import { Button } from "@/components/ui/button";
import type { QueryObserverResult } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

interface Props {
  isLoading: boolean;
  isDeviceStateLoading: boolean;
  isStateError: boolean;
  state: "on" | "off";
  onMutation: (currentState: "on" | "off") => void;
  refetch: () => Promise<QueryObserverResult>;
}

export const DeviceActions = ({
  isLoading,
  isDeviceStateLoading,
  isStateError,
  state,
  onMutation,
  refetch,
}: Props) => {
  return (
    <section className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        onClick={() => {
          /* TODO: Share device */
        }}
        disabled={isLoading}
      >
        Share Device
      </Button>
      <DeviceReload isLoading={isDeviceStateLoading} refetch={refetch} />

      <Button
        variant={state === "on" ? "secondary" : "default"}
        onClick={() => {
          onMutation(state);
        }}
        disabled={isDeviceStateLoading || isStateError}
        className="col-span-2"
      >
        {state === "on" ? "Turn Off" : "Turn On"}
      </Button>
    </section>
  );
};

const DeviceReload = ({
  isLoading,
  refetch,
}: {
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult>;
}) => {
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefetch = () => {
    setIsRefetching(true);
    refetch().then(() => {
      setIsRefetching(false);
    });
  };

  return (
    <Button
      variant="outline"
      disabled={isLoading || isRefetching}
      className="relative"
      onClick={handleRefetch}
    >
      {isRefetching && (
        <RefreshCcw className="animate-spin-reverse text-muted-foreground absolute left-2 size-4 origin-center" />
      )}
      Reload
    </Button>
  );
};
