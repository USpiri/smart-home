import { Link, Navigate, useNavigate, useParams } from "react-router";
import { useDevice } from "../hooks/useDevice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PencilLine, QrCode, Trash2 } from "lucide-react";
import { useDeleteDevice } from "../hooks/useDeleteDevice";

export const DevicePage = () => {
  const { deviceId } = useParams();
  const { mutate: deleteDevice } = useDeleteDevice();
  const navigate = useNavigate();

  const {
    query: { data: device, isLoading },
  } = useDevice(Number(deviceId));

  if (!deviceId) return <Navigate to="/devices" />;

  const handleDelete = () => {
    if (device) {
      deleteDevice(device.id, {
        onSuccess: () => {
          navigate("/devices");
        },
      });
    }
  };

  return (
    <main className="container mx-auto grid w-full grid-rows-[auto_1fr] p-4 lg:max-w-4xl">
      <div className="flex items-center justify-between">
        <header>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="size-4" />
            </Button>

            <h1 className="text-2xl font-bold">
              {!isLoading ? device?.name : "Loading..."}
            </h1>
            <div className="mt-2 ml-2 size-2 rounded-full bg-emerald-300" />
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
          <Button variant="outline" size="icon" disabled={isLoading}>
            <QrCode className="size-4" />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-10 flex flex-col justify-between">
          <div className="mb-10 grid gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">State:</span>{" "}
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">Connected</p>
                <div className="size-2 rounded-full bg-emerald-300" />
              </div>
            </div>
            <div>
              <span className="font-semibold">Description:</span>{" "}
              <span>
                {device?.description || (
                  <span className="text-muted-foreground italic">
                    No description
                  </span>
                )}
              </span>
            </div>
            <div>
              <span className="font-semibold">IP Address:</span>{" "}
              <span className="text-muted-foreground font-mono text-sm">
                {device?.ip || (
                  <span className="text-muted-foreground italic">Unknown</span>
                )}
              </span>
            </div>
            <div>
              <span className="font-semibold">Type:</span>{" "}
              <span className="text-muted-foreground text-sm capitalize">
                {device?.type}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 *:w-full">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                /* TODO: Toggle state */
              }}
            >
              Toggle State
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                /* TODO: Reload state */
              }}
            >
              Reload State
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                /* TODO: Share device */
              }}
            >
              Share Device
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};
