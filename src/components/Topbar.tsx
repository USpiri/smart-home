import { Button } from "./ui/button";
import { QrCode, Sun } from "lucide-react";

export const Topbar = () => {
  return (
    <div className="bg-background sticky h-14 flex items-center justify-between px-4 top-0 border-b border-border">
      <h1 className="text-lg font-mono">Smart home</h1>
      <div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <QrCode className="size-4" />
          <span className="sr-only">QR Code</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Sun className="w-4 h-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
};
