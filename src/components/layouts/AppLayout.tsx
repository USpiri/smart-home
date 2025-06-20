import { Outlet } from "react-router";
import { Topbar } from "../Topbar";
import { useThemeStore } from "@/store/theme.store";
import { useEffect } from "react";

export const AppLayout = () => {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  // Set the theme
  useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
};
