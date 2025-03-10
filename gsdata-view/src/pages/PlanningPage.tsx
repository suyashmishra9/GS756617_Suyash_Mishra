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
    if (savedRows) {
      dispatch(setRows(JSON.parse(savedRows)));
    } else if (stores.length > 0 && skus.length > 0) {
      const planningData: PlanningRow[] = stores.flatMap((store) =>
        skus.map((sku) => {
          const baseRow: PlanningRow = {
            id: `${store.id}-${sku.id}`,
            storeName: store.name,
            skuName: sku.name,
            price: sku.price,
            cost: sku.cost,
          };

          // Initialize week fields
          weeks.forEach((week) => {
            baseRow[`${week}_salesUnit`] = "";
            baseRow[`${week}_salesDollars`] = "";
            baseRow[`${week}_gmDollars`] = "";
            baseRow[`${week}_gmPercent`] = "";
          });

          return baseRow;
        })
      );
      dispatch(setRows(planningData));
    }
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
