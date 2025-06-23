import type { QRData } from "@/lib/validation";
import { ScanQr } from "../components/ScanQr";
import { useCreateDevice } from "@/features/devices/hooks";
import { useNavigate } from "react-router";

export const ScanQrPage = () => {
  const { mutate: createDevice } = useCreateDevice();
  const navigate = useNavigate();

  const handleScan = async (data: QRData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    switch (data.type) {
      case "device":
        createDevice(data.data, {
          onSuccess: () => {
            navigate(`/devices`);
          },
        });
        break;
      case "room":
        navigate(`/rooms`);
        break;
    }
  };

  return (
    <main className="container mx-auto grid w-full grid-rows-[auto_1fr] gap-4 p-4 lg:max-w-4xl">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-2xl font-bold">Scan QR Code</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Scan the QR code to add a new device
          </p>
        </header>
      </div>
      <ScanQr onScan={handleScan} />
    </main>
  );
};
