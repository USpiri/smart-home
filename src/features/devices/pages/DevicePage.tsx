import { Link, Navigate, useNavigate, useParams } from "react-router";
import { useDevice } from "../hooks/useDevice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PencilLine, QrCode, Trash2 } from "lucide-react";
import { useDeleteDevice } from "../hooks/useDeleteDevice";
import { useLocaleDeviceState } from "@/hooks/useLocaleDeviceState";
import { useLocalDeviceMutation } from "@/hooks/useLocalDeviceMutation";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { DeviceDetails } from "../components/DeviceDetails";
import { DeviceActions } from "../components/DeviceActions";
import { ShareDeviceDialog } from "../components/ShareDeviceDialog";
import { useDialogStore } from "@/store";

export const DevicePage = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const openDialog = useDialogStore((s) => s.toggleDialog);

  const {
    query: { data: device, isLoading },
  } = useDevice(Number(deviceId));
  const {
    query: {
      data: deviceState,
      isLoading: isDeviceStateLoading,
      error,
      refetch,
    },
  } = useLocaleDeviceState(device?.ip);
  const { mutate: deleteDevice } = useDeleteDevice();
  const { onMutation, offMutation } = useLocalDeviceMutation(device?.ip ?? "");

  const handleDelete = () => {
    if (device) {
      deleteDevice(device.id, {
        onSuccess: () => {
          navigate("/devices");
        },
      });
    }
  };

  if (!deviceId) return <Navigate to="/devices" />;
  return (
    <main className="container mx-auto grid w-full grid-rows-[auto_1fr_auto] p-4 lg:max-w-4xl">
      <section className="mb-6 flex items-center justify-between border-b pb-4">
        <header>
          <div className="flex items-center gap-2">
            <Link to="/devices">
              <Button variant="ghost" size="icon" className="size-8">
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {!isLoading ? device?.name : "Loading..."}
            </h1>
            <ConnectionStatus
              status={
                isDeviceStateLoading
                  ? "connecting"
                  : error
                    ? "disconnected"
                    : "connected"
              }
            />
          </div>
          <p className="text-muted-foreground mt-1 text-sm capitalize">
            {!isLoading ? (device?.description ?? device?.type) : "Loading..."}
          </p>
        </header>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={isLoading}
            onClick={handleDelete}
          >
            <Trash2 className="size-4" />
          </Button>
          <Button variant="outline" size="icon" asChild disabled={isLoading}>
            <Link to={`/devices/${device?.id}/edit`}>
              <PencilLine className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={isLoading}
            onClick={() => openDialog("share-device")}
          >
            <QrCode className="size-4" />
          </Button>
        </div>
      </section>
      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <span className="text-muted-foreground animate-pulse text-lg">
            Loading device...
          </span>
        </div>
      ) : (
        <DeviceDetails deviceId={Number(deviceId)} />
      )}
      <DeviceActions
        isLoading={isLoading}
        isDeviceStateLoading={isDeviceStateLoading}
        isStateError={error !== null}
        state={deviceState?.status ?? "off"}
        onMutation={(state) => {
          if (state === "on") {
            offMutation.mutate();
          } else {
            onMutation.mutate();
          }
        }}
        refetch={refetch}
      />
      {device && <ShareDeviceDialog device={device} />}
    </main>
  );
};
