import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PinedStore {
  pinedRooms: number[];
  pinedDevices: number[];
  pinRoom: (roomId: number) => void;
  pinDevice: (deviceId: number) => void;
  unpinRoom: (roomId: number) => void;
  unpinDevice: (deviceId: number) => void;
  clearPined: () => void;
}

const storageKey = "pined";
const initialState = {
  pinedRooms: [],
  pinedDevices: [],
};

export const usePinedStore = create<PinedStore>()(
  persist(
    (set) => ({
      ...initialState,
      pinRoom: (roomId: number) => {
        set((state) => ({
          pinedRooms: [...state.pinedRooms, roomId],
        }));
      },
      pinDevice: (deviceId: number) => {
        set((state) => ({
          pinedDevices: [...state.pinedDevices, deviceId],
        }));
      },
      unpinRoom: (roomId: number) => {
        set((state) => ({
          pinedRooms: state.pinedRooms.filter((id) => id !== roomId),
        }));
      },
      unpinDevice: (deviceId: number) => {
        set((state) => ({
          pinedDevices: state.pinedDevices.filter((id) => id !== deviceId),
        }));
      },
      clearPined: () => {
        set(initialState);
      },
    }),
    {
      name: storageKey,
    },
  ),
);
