import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import { RootState, AppDispatch } from "../redux/store";
import { Box } from "@mui/material";
import { setRows, updateRow } from "../redux/slices/planningSlice";

interface PlanningRow {
  id: string;
  storeName: string;
  skuName: string;
  price: number;
  cost: number;
  [key: string]: string | number | "";
}

const weeks = ["week1", "week2", "week3", "week4"];
const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

const PlanningPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stores = useSelector((state: RootState) => state.store.stores);
  const skus = useSelector((state: RootState) => state.sku.skus);
  const rows = useSelector((state: RootState) => state.planning.rows);

  useEffect(() => {
    const savedRows = localStorage.getItem("planningRows");
    let existingRows: PlanningRow[] = savedRows ? JSON.parse(savedRows) : [];
  
    // Create a map of existing rows for easy lookup
    const existingRowMap = new Map(existingRows.map(row => [row.id, row]));
  
    // Generate new rows based on current stores and SKUs
    const newRows: PlanningRow[] = stores.flatMap(store =>
      skus.map(sku => {
        const rowId = `${store.id}-${sku.id}`;
  
        // If row already exists, keep the previous data
        if (existingRowMap.has(rowId)) {
          return existingRowMap.get(rowId)!;
        }
  
        // Otherwise, create a new row
        const baseRow: PlanningRow = {
          id: rowId,
          storeName: store.name,
          skuName: sku.name,
          price: sku.price,
          cost: sku.cost,
        };
  
        weeks.forEach(week => {
          baseRow[`${week}_salesUnit`] = "";
          baseRow[`${week}_salesDollars`] = "";
          baseRow[`${week}_gmDollars`] = "";
          baseRow[`${week}_gmPercent`] = "";
        });
  
        return baseRow;
      })
    );
  
    dispatch(setRows(newRows));
    localStorage.setItem("planningRows", JSON.stringify(newRows));
  }, [stores, skus, dispatch]);
  

  const processRowUpdate = (updatedRow: PlanningRow, originalRow: PlanningRow) => {
    const newRow = { ...updatedRow };
  
    weeks.forEach((week) => {
      const salesUnit = Number(newRow[`${week}_salesUnit`]) || 0;
      const salesDollars = salesUnit * originalRow.price;
      const gmDollars = salesDollars - salesUnit * originalRow.cost;
      const gmPercent = salesDollars ? `${((gmDollars / salesDollars) * 100).toFixed(2)}%` : "";
  
      newRow[`${week}_salesDollars`] = `$${salesDollars.toFixed(2)}`;
      newRow[`${week}_gmDollars`] = `$${gmDollars.toFixed(2)}`;
      newRow[`${week}_gmPercent`] = gmPercent;
    });
  
    dispatch(updateRow(newRow));
  
    const updatedRows = rows.map((row) => (row.id === originalRow.id ? newRow : row));
    localStorage.setItem("planningRows", JSON.stringify(updatedRows));
  
    return newRow;
  };
  

  const columns: GridColDef[] = [
    { field: "storeName", headerName: "Store", width: 150 },
    { field: "skuName", headerName: "SKU", width: 150 },
    ...weeks.flatMap((week) => [
      {
        field: `${week}_salesUnit`,
        headerName: "Sales Unit",
        width: 130,
        editable: true,
      },
      {
        field: `${week}_salesDollars`,
        headerName: "Sales Dollars",
        width: 130,
      },
      {
        field: `${week}_gmDollars`,
        headerName: "GM Dollars",
        width: 130,
      },
      {
        field: `${week}_gmPercent`,
        headerName: "GM Percent",
        width: 130,
        cellClassName: (params: any) => {
          const rawValue = params.value ? params.value.replace("%", "").trim() : "";
          const value = rawValue ? parseFloat(rawValue) : null;
  
          if (value === null || isNaN(value)) return "bg-white text-black"; // Default white background
  
          return value >= 40
            ? "bg-green-300 text-black"
            : value >= 10 && value < 40
            ? "bg-yellow-300 text-black"
            : value > 5 && value < 10
            ? "bg-orange-300 text-black"
            : "bg-red-300 text-black";
        },
      },
    ]),
  ];
  

  

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: currentMonth,
      headerAlign: "center",
      children: weeks.map((week, index) => ({
        groupId: `Week ${index + 1}`,
        children: [
          { field: `${week}_salesUnit` },
          { field: `${week}_salesDollars` },
          { field: `${week}_gmDollars` },
          { field: `${week}_gmPercent` },
        ],
      })),
    },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "auto", position: "relative", zIndex: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ columnGrouping: true } as any}
        columnGroupingModel={columnGroupingModel}
      />
    </Box>
  );
};

export default PlanningPage;
