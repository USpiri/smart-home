import { useThemeStore } from "@/store/theme.store";
import { Button } from "./ui/button";
import { Moon, QrCode, Sun } from "lucide-react";

export const Topbar = () => {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <div className="bg-background sticky h-14 flex items-center justify-between px-4 top-0 border-b border-border">
      <h1 className="text-lg font-mono">Smart home</h1>
      <div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <QrCode className="size-4" />
          <span className="sr-only">QR Code</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
};
