import { Outlet } from "react-router";
import { Topbar } from "../Topbar";

export const AppLayout = () => {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
};
