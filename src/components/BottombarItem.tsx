import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export const BottombarItem = ({
  to,
  Icon,
  label,
}: {
  to: string;
  Icon: LucideIcon;
  label: string;
}) => {
  return (
    <Button variant="ghost" size="icon" asChild>
      <NavLink to={to}>
        {({ isActive }) => (
          <>
            <Icon
              className={cn(
                isActive ? "text-foreground" : "text-muted-foreground",
                "size-5 transition-colors",
              )}
            />
            <span className="sr-only">{label}</span>
          </>
        )}
      </NavLink>
    </Button>
  );
};
