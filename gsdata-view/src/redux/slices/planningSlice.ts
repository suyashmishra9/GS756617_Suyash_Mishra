import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
  rows: JSON.parse(localStorage.getItem("planningRows") || "[]"),
};

const weeks = ["week1", "week2", "week3", "week4"];

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<PlanningRow[]>) => {
      state.rows = action.payload;
      localStorage.setItem("planningRows", JSON.stringify(state.rows));
    },
    updateRow: (state, action: PayloadAction<PlanningRow>) => {
      state.rows = state.rows.map((row) =>
        row.id === action.payload.id ? action.payload : row
      );
      localStorage.setItem("planningRows", JSON.stringify(state.rows));
    },
  },
});

// Redux Actions
export const { setRows, updateRow } = planningSlice.actions;
export default planningSlice.reducer;

// =======================
// 🚀 **Selector for Chart Page** 🚀
// =======================

export const selectGMDataByStore = createSelector(
  (state: RootState) => state.planning.rows,
  (_: RootState, storeName: string) => storeName,
  (rows, storeName) => {
    return weeks.map((week) => {
      let totalSalesDollars = 0;
      let totalGMDollars = 0;

      rows.forEach((row) => {
        if (row.storeName === storeName) {
          const salesDollars = Number(row[`${week}_salesDollars`]?.toString().replace("$", "")) || 0;
          const gmDollars = Number(row[`${week}_gmDollars`]?.toString().replace("$", "")) || 0;

          totalSalesDollars += salesDollars;
          totalGMDollars += gmDollars;
        }
      });

      return {
        week,
        gmDollars: totalGMDollars,
        gmPercent: totalSalesDollars > 0 ? (totalGMDollars / totalSalesDollars) * 100 : 0,
      };
    });
  }
);
