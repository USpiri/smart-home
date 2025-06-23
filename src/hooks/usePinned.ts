import { usePinedStore } from "@/store";

export const usePinned = () => {
  const pinRoom = usePinedStore((s) => s.pinRoom);
  const pinDevice = usePinedStore((s) => s.pinDevice);
  const unpinRoom = usePinedStore((s) => s.unpinRoom);
  const unpinDevice = usePinedStore((s) => s.unpinDevice);
  const clearPined = usePinedStore((s) => s.clearPined);
  const pinedRooms = usePinedStore((s) => s.pinedRooms);
  const pinedDevices = usePinedStore((s) => s.pinedDevices);

  const isPinedRoom = (roomId: number) => pinedRooms.includes(roomId);
  const isPinedDevice = (deviceId: number) => pinedDevices.includes(deviceId);

  const togglePinRoom = (roomId: number) => {
    if (isPinedRoom(roomId)) {
      unpinRoom(roomId);
    } else {
      pinRoom(roomId);
    }
  };

  const togglePinDevice = (deviceId: number) => {
    if (isPinedDevice(deviceId)) {
      unpinDevice(deviceId);
    } else {
      pinDevice(deviceId);
    }
  };

  return {
    isPinedRoom,
    isPinedDevice,
    pinRoom,
    pinDevice,
    unpinRoom,
    unpinDevice,
    togglePinRoom,
    togglePinDevice,
    clearPined,
  };
};
