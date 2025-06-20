import { Building2, Home, QrCode, Tablet } from "lucide-react";
import { Button } from "./ui/button";

export const Bottombar = () => {
  return (
    <nav className="bg-background dark:border-border fixed right-0 bottom-0 left-0 z-50 flex h-14 w-full items-center justify-around shadow-[0_-2px_4px_rgba(0,0,0,0.1)] md:h-16 dark:border-t">
      <Button variant="ghost" size="icon" className="text-muted-foreground">
        <Home className="size-5" />
        <span className="sr-only">Home</span>
      </Button>
      <Button variant="ghost" size="icon" className="text-muted-foreground">
        <Building2 className="size-5" />
        <span className="sr-only">Rooms</span>
      </Button>
      <Button variant="ghost" size="icon" className="text-muted-foreground">
        <Tablet className="size-5" />
        <span className="sr-only">Devices</span>
      </Button>
      <Button variant="ghost" size="icon" className="text-muted-foreground">
        <QrCode className="size-5" />
        <span className="sr-only">ScanQR Code</span>
      </Button>
    </nav>
  );
};
