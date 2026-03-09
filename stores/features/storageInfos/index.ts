import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StorageInfo {
  id: string;
  ingredientName: string;
  storageLocations: {
    [location: string]: StorageDuration[];
  };
}

type StorageDurationUnit =
  | "jours"
  | "semaines"
  | "mois"
  | "date de péremption"
  | "indéfiniment";

interface StorageDuration {
  id: string;
  type: "avant ouverture" | "après ouverture";
  duration: number | null;
  unit: StorageDurationUnit;
}

const initialState = {
  storageInfos: [] as StorageInfo[],
};

export const storageInfoSlice = createSlice({
  name: "storageInfos",
  initialState,
  reducers: {
    setStorageInfos: (state, action: PayloadAction<StorageInfo[]>) => {
      state.storageInfos = action.payload;
    },
    storageInfoSetted: (state, action: PayloadAction<StorageInfo>) => {
      const storageInfoId = action.payload.id;

      const index = state.storageInfos.findIndex(
        (item) => item.id === storageInfoId,
      );

      if (index === -1) {
        state.storageInfos.push(action.payload);
      } else {
        state.storageInfos[index] = action.payload;
      }
    },
    storageInfoDeleted: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      state.storageInfos = state.storageInfos.filter(
        (item) => item.id !== ingredientId,
      );
    },
  },
});

export const { setStorageInfos, storageInfoSetted, storageInfoDeleted } =
  storageInfoSlice.actions;
export default storageInfoSlice.reducer;
