import { useThemeStore } from "@/store/theme.store";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { Bottombar } from "../Bottombar";
import { Topbar } from "../Topbar";

export const AppLayout = () => {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  // Set the theme
  useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Topbar />
      <Outlet />
      <Bottombar />
    </div>
  );
};
