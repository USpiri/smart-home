import { AppLayout } from "@/components/layouts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<h1>Hello World</h1>} />
          <Route path="/rooms" element={<h1>Rooms</h1>} />
          <Route path="/devices" element={<h1>Devices</h1>} />
          <Route path="/scan-qr" element={<h1>Scan QR</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
