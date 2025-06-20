import { useThemeStore } from "@/store/theme.store";
import { Button } from "./ui/button";
import { Moon, QrCode, Sun } from "lucide-react";

export const Topbar = () => {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <div className="bg-background border-border sticky top-0 flex h-14 items-center justify-between border-b px-4">
      <h1 className="font-mono text-lg">Smart home</h1>
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
