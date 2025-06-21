import { Lightbulb, LightbulbOff } from "lucide-react";

interface Props {
  on: boolean;
}

export const LightBulbState = ({ on }: Props) => {
  return on ? (
    <Lightbulb className="size-4 text-yellow-500" />
  ) : (
    <LightbulbOff className="size-4 text-neutral-500" />
  );
};
