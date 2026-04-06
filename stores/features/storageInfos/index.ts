import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchStorageInfosThunk,
  setStorageInfoThunk,
  removeStorageInfoThunk,
} from "@stores/thunks/storageInfos";
import { WithRequiredId } from "@app-types/NameId";

export interface StorageInfo {
  id?: number;
  ingredientId: number;
  storageLocations: {
    id: number;
    storageDurations: StorageDuration[];
  }[];
}

type StorageDurationUnit =
  | "jours"
  | "semaines"
  | "mois"
  | "date de péremption"
  | "indéfiniment";

export interface StorageDuration {
  type: "avant ouverture" | "après ouverture";
  duration: number | null;
  units: StorageDurationUnit;
}

const initialState = {
  storageInfos: [] as WithRequiredId<StorageInfo>[],
  loading: false,
  error: null as string | null,
};

export const storageInfoSlice = createSlice({
  name: "storageInfos",
  initialState,
  reducers: { resetStorageInfos: () => initialState },
  extraReducers: (builder) => {
    // fetchStorageInfosThunk
    builder
      .addCase(fetchStorageInfosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStorageInfosThunk.fulfilled,
        (state, action: PayloadAction<WithRequiredId<StorageInfo>[]>) => {
          state.loading = false;
          if (state.storageInfos.length === 0) {
            state.storageInfos = action.payload;
          }
        },
      )
      .addCase(
        fetchStorageInfosThunk.rejected,
        (state, action: ReturnType<typeof fetchStorageInfosThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // setStorageInfoThunk
    builder
      .addCase(setStorageInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setStorageInfoThunk.fulfilled,
        (state, action: PayloadAction<WithRequiredId<StorageInfo>>) => {
          state.loading = false;
          const index = state.storageInfos.findIndex(
            (item) => item.ingredientId === action.payload.ingredientId,
          );
          if (index === -1) state.storageInfos.push(action.payload);
          else state.storageInfos[index] = action.payload;
        },
      )
      .addCase(
        setStorageInfoThunk.rejected,
        (state, action: ReturnType<typeof setStorageInfoThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // removeStorageInfoThunk
    builder
      .addCase(removeStorageInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeStorageInfoThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.storageInfos = state.storageInfos.filter(
            (item) => item.ingredientId !== action.payload,
          );
        },
      )
      .addCase(
        removeStorageInfoThunk.rejected,
        (state, action: ReturnType<typeof removeStorageInfoThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const { resetStorageInfos } = storageInfoSlice.actions;
export default storageInfoSlice.reducer;
