import { AppLayout } from "@/components/layouts";
import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

const Home = lazy(() =>
  import("@/features/home/pages/HomePage").then((module) => ({
    default: module.HomePage,
  })),
);

const Rooms = lazy(() =>
  import("@/features/rooms/pages/RoomsPage").then((module) => ({
    default: module.RoomsPage,
  })),
);

const Devices = lazy(() =>
  import("@/features/devices/pages/DevicesPage").then((module) => ({
    default: module.DevicesPage,
  })),
);

const ScanQr = lazy(() =>
  import("@/features/scan-qr/pages/ScanQrPage").then((module) => ({
    default: module.ScanQrPage,
  })),
);

const NewRoom = lazy(() =>
  import("@/features/rooms/pages/NewRoomPage").then((module) => ({
    default: module.NewRoomPage,
  })),
);

const NewDevice = lazy(() =>
  import("@/features/devices/pages/NewDevicePage").then((module) => ({
    default: module.NewDevicePage,
  })),
);

const Device = lazy(() =>
  import("@/features/devices/pages/DevicePage").then((module) => ({
    default: module.DevicePage,
  })),
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/rooms">
            <Route index element={<Rooms />} />
            <Route path="new" element={<NewRoom />} />
            <Route path=":roomId/edit" element={<NewRoom />} />
          </Route>
          <Route path="/devices">
            <Route index element={<Devices />} />
            <Route path="new" element={<NewDevice />} />
            <Route path=":deviceId" element={<Device />} />
            <Route path=":deviceId/edit" element={<NewDevice />} />
          </Route>
          <Route path="/scan-qr" element={<ScanQr />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
