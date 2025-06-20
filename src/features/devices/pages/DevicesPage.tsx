import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router";

export const DevicesPage = () => {
  return (
    <main className="container mx-auto w-full p-4 lg:max-w-4xl">
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
    </main>
  );
};
