import { ConnectionStatus } from "@/components/ConnectionStatus";
import { LightBulbState } from "@/components/LightBulbState";
import { useLocaleDeviceState } from "@/hooks";
import { useDevice } from "../hooks/useDevice";
import { PinDeviceButton } from "@/components/PinDeviceButton";

interface Props {
  deviceId: number;
}

export const DeviceDetails = ({ deviceId }: Props) => {
  const {
    query: { data: device },
  } = useDevice(deviceId);

  const {
    query: { data: state, isLoading: isStateLoading, error },
  } = useLocaleDeviceState(device?.ip);

  return (
    <section className="bg-background-secondary h-fit rounded-lg border p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        <div>
          <h2 className="text-muted-foreground mb-1 text-xs">Connection</h2>
          <div className="flex items-center gap-2">
            <ConnectionStatus
              size="sm"
              status={
                isStateLoading
                  ? "connecting"
                  : error
                    ? "disconnected"
                    : "connected"
              }
            />
            <p className="text-sm capitalize">
              {error
                ? "Disconnected"
                : isStateLoading
                  ? "Checking..."
                  : "Connected"}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-muted-foreground mb-2 text-xs">Status</h2>
          <div className="flex items-center gap-2">
            <LightBulbState on={state?.status === "on"} />
            <p className="font-mono text-sm capitalize">
              {state?.status ?? (
                <span className="text-muted-foreground italic">Unknown</span>
              )}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-muted-foreground mb-1 text-xs">Description</h2>
          <p>
            {device?.description || (
              <span className="text-muted-foreground italic">
                No description
              </span>
            )}
          </p>
        </div>

        <div>
          <h2 className="text-muted-foreground mb-1 text-xs">IP Address</h2>
          <p className="text-muted-foreground font-mono text-sm">
            {device?.ip || (
              <span className="text-muted-foreground italic">Unknown</span>
            )}
          </p>
        </div>

        <div>
          <h2 className="text-muted-foreground mb-1 text-xs">Type</h2>
          <p className="text-muted-foreground text-sm capitalize">
            {device?.type}
          </p>
        </div>

        <div>
          <h2 className="text-muted-foreground mb-1 text-xs">Pined</h2>
          <PinDeviceButton
            deviceId={deviceId}
            btnClassName="size-9 mt-2"
            className="size-4"
          />
        </div>
      </div>
    </section>
  );
};
