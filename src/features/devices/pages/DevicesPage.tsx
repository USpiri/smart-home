import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { DeviceList } from "../../../components/DeviceList";
import { useDevices } from "../hooks/useDevices";

export const DevicesPage = () => {
  const {
    query: { data, isLoading },
  } = useDevices();

  return (
    <main className="container mx-auto w-full space-y-8 p-4 lg:max-w-4xl">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-2xl font-bold">Devices</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your smart devices
          </p>
        </header>
        <Button variant="outline" size="sm" asChild>
          <Link to="/devices/new">
            <Plus className="size-4" />
            <span>Add Device</span>
          </Link>
        </Button>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && data.length > 0 && <DeviceList devices={data} />}
      {!isLoading && data && data.length === 0 && (
        <div className="text-muted-foreground text-sm">
          There are no devices at the moment
        </div>
      )}
    </main>
  );
};
