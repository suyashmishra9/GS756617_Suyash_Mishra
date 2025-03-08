import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SKU {
  id: number;
  name: string;
  price: number;
  cost: number;
}

interface SKUState {
  skus: SKU[];
}

const initialState: SKUState = {
  skus: JSON.parse(localStorage.getItem("skus") || "[]"),
};

const skuSlice = createSlice({
  name: "sku",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<Omit<SKU, "id">>) => {
      const newSKU = { id: state.skus.length + 1, ...action.payload };
      state.skus.push(newSKU);
      localStorage.setItem("skus", JSON.stringify(state.skus));
    },
    deleteSKU: (state, action: PayloadAction<number>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
      localStorage.setItem("skus", JSON.stringify(state.skus));
    },
  },
});

export const { addSKU, deleteSKU } = skuSlice.actions;
export default skuSlice.reducer;
