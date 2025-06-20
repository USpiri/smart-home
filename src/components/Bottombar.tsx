import { Building2, Home, QrCode, Tablet } from "lucide-react";
import { BottombarItem } from "./BottombarItem";

export const Bottombar = () => {
  return (
    <nav className="bg-background dark:border-border flex h-14 w-full items-center shadow-[0_-2px_4px_rgba(0,0,0,0.1)] md:h-16 dark:border-t">
      <div className="container mx-auto flex w-full items-center justify-around lg:max-w-4xl">
        <BottombarItem to="/" Icon={Home} label="Home" />
        <BottombarItem to="/rooms" Icon={Building2} label="Rooms" />
        <BottombarItem to="/devices" Icon={Tablet} label="Devices" />
        <BottombarItem to="/scan-qr" Icon={QrCode} label="ScanQR Code" />
      </div>
    </nav>
  );
};
