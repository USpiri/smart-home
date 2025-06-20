import { Button } from "@/components/ui/button";
import { ArrowLeft, QrCode } from "lucide-react";
import { Link } from "react-router";

export const NewDevicePage = () => {
  return (
    <main className="container mx-auto w-full p-4 lg:max-w-4xl">
      <div className="flex items-center justify-between">
        <header>
          <div className="flex items-center gap-2">
            <Link to="/devices">
              <Button variant="ghost" size="icon" className="size-8">
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">New Device</h1>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Add a new device to your home
          </p>
        </header>
        <Button variant="outline" size="icon">
          <QrCode className="size-4" />
        </Button>
      </div>
    </main>
  );
};
