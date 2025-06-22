import { create } from "zustand";

export const dialogs = ["share-device"] as const;
export type DialogType = (typeof dialogs)[number];

interface Store {
  dialogs: Partial<Record<DialogType, boolean>>;
  toggleDialog: (type: DialogType, open?: boolean) => void;
  closeAll: () => void;
}

const initialState = {
  // By default, all dialogs are closed
  dialogs: {},
};

export const useDialogStore = create<Store>()((set) => ({
  ...initialState,
  toggleDialog: (type, open) =>
    // This is a workaround to give the browser time to render the dialog
    // Otherwise, the dialog only opens once
    // This is an issue with the Dialogs that have a form inside
    // https://github.com/shadcn-ui/ui/discussions/5953
    requestAnimationFrame(() =>
      set((state) => ({
        dialogs: { ...state.dialogs, [type]: open ?? !state.dialogs[type] },
      })),
    ),
  closeAll: () => set(initialState),
}));
