import { useThemeStore } from "@/store/theme.store";
import { Button } from "./ui/button";
import { Moon, QrCode, Sun } from "lucide-react";
import { Link } from "react-router";

export const Topbar = () => {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <div className="bg-background border-border sticky top-0 border-b">
      <div className="container mx-auto flex h-14 w-full items-center justify-between px-4 lg:max-w-4xl">
        <Link to="/">
          <h1 className="font-mono font-semibold">Smart home</h1>
        </Link>
        <div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            asChild
          >
            <Link to="/scan-qr">
              <QrCode className="size-4" />
              <span className="sr-only">QR Code</span>
            </Link>
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
    </div>
  );
};
