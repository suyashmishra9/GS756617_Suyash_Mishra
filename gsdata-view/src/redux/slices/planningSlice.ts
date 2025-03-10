import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlanningRow {
  id: string;
  storeName: string;
  skuName: string;
  price: number;
  cost: number;
  [key: string]: string | number | "";
}

interface PlanningState {
  rows: PlanningRow[];
}

const initialState: PlanningState = {
  rows: [],
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<PlanningRow[]>) => {
      state.rows = action.payload;
    },
    updateRow: (state, action: PayloadAction<PlanningRow>) => {
      state.rows = state.rows.map((row) =>
        row.id === action.payload.id ? action.payload : row
      );
    },
  },
});

export const { setRows, updateRow } = planningSlice.actions;
export default planningSlice.reducer;
    