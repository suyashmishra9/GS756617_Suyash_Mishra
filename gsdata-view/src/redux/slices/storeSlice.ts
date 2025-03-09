import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
}

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<{ name: string; city: string; state: string }>) => {
      state.stores.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    updateStore: (state, action: PayloadAction<{ id: string; name: string; city: string; state: string }>) => {
      const store = state.stores.find((s) => s.id === action.payload.id);
      if (store) Object.assign(store, action.payload);
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addStore, updateStore, deleteStore } = storeSlice.actions;
export default storeSlice.reducer;
