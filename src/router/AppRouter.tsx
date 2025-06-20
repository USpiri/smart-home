import { AppLayout } from "@/components/layouts";
import { DevicesPage, NewDevicePage } from "@/features/devices/pages";
import { HomePage } from "@/features/home/pages";
import { RoomsPage } from "@/features/rooms/pages";
import { ScanQrPage } from "@/features/scan-qr/pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/devices">
            <Route index element={<DevicesPage />} />
            <Route path="new" element={<NewDevicePage />} />
          </Route>
          <Route path="/scan-qr" element={<ScanQrPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
