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
  stores: JSON.parse(localStorage.getItem("stores") || "[]"), 
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<{ name: string; city: string; state: string }>) => {
      const newStore = { id: crypto.randomUUID(), ...action.payload };
      state.stores.push(newStore);
      localStorage.setItem("stores", JSON.stringify(state.stores)); 
    },
    updateStore: (state, action: PayloadAction<{ id: string; name: string; city: string; state: string }>) => {
      const store = state.stores.find((s) => s.id === action.payload.id);
      if (store) {
        Object.assign(store, action.payload);
        localStorage.setItem("stores", JSON.stringify(state.stores)); 
      }
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((s) => s.id !== action.payload);
      localStorage.setItem("stores", JSON.stringify(state.stores)); 
    },
  },
});

export const { addStore, updateStore, deleteStore } = storeSlice.actions;
export default storeSlice.reducer;
