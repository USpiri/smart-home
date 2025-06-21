import { Button } from "@/components/ui/button";
import { ArrowLeft, QrCode } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { DeviceForm } from "../components/DeviceForm";
import { useDevice } from "../hooks/useDevice";

export const NewDevicePage = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const {
    query: { data: device, isLoading },
  } = useDevice(Number(deviceId));

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
              {deviceId ? "Edit Device" : "New Device"}
            </h1>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            {deviceId ? "Edit a device" : "Add a new device to your home"}
          </p>
        </header>
        <Button variant="outline" size="icon">
          <QrCode className="size-4" />
        </Button>
      </div>
      <div className="mt-10">
        {isLoading ? <div>Loading...</div> : <DeviceForm device={device} />}
      </div>
    </main>
  );
};
