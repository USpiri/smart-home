import { useDialogStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Device } from "@/types";
import { QrCode } from "@/components/QrCode";

interface Props {
  device: Device;
}

export const ShareDeviceDialog = ({ device }: Props) => {
  const open = useDialogStore((s) => s.dialogs["share-device"]);
  const toggleDialog = useDialogStore((s) => s.toggleDialog);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => toggleDialog("share-device", open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share {device.name}</DialogTitle>
          <DialogDescription>
            Scan the QR code to add this device to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <QrCode data={device} size={300} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
