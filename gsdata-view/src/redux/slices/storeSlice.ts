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
  stores: [
    { id: "1", name: "Walmart", city: "New York", state: "NY" },
    { id: "2", name: "Target", city: "Los Angeles", state: "CA" },
    { id: "3", name: "Costco", city: "Chicago", state: "IL" },
  ],
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<{ name: string; city: string; state: string }>) => {
      state.stores.push({
        id: (state.stores.length + 1).toString(),
        name: action.payload.name,
        city: action.payload.city,
        state: action.payload.state,
      });
    },
    updateStore: (state, action: PayloadAction<{ id: string; name: string; city: string; state: string }>) => {
      const store = state.stores.find((s) => s.id === action.payload.id);
      if (store) {
        store.name = action.payload.name;
        store.city = action.payload.city;
        store.state = action.payload.state;
      }
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addStore, updateStore, deleteStore } = storeSlice.actions;
export default storeSlice.reducer;
