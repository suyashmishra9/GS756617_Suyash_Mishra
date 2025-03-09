import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { RootState } from "../redux/store";
import { Box } from "@mui/material";

interface PlanningRow {
  id: string;
  storeName: string;
  skuName: string;
  price: number;
  cost: number;
  salesUnit: number | "";
  salesDollars: number | "";
  gmDollars: number | "";
  gmPercent: string;
}

const PlanningPage: React.FC = () => {
  const stores = useSelector((state: RootState) => state.store.stores);
  const skus = useSelector((state: RootState) => state.sku.skus);
  const [rows, setRows] = useState<PlanningRow[]>([]);

  useEffect(() => {
    if (stores.length > 0 && skus.length > 0) {
      const planningData: PlanningRow[] = stores.flatMap((store) =>
        skus.map((sku) => ({
          id: `${store.id}-${sku.id}`, 
          storeName: store.name,
          skuName: sku.name,
          price: sku.price,
          cost: sku.cost,
          salesUnit: "",
          salesDollars: "",
          gmDollars: "",
          gmPercent: "",
        }))
      );
      setRows(planningData);
    }
  }, [stores, skus]);

  const processRowUpdate = (updatedRow: PlanningRow, originalRow: PlanningRow) => {
    const salesUnit = Number(updatedRow.salesUnit) || 0;
    const salesDollars = salesUnit * originalRow.price;
    const gmDollars = salesDollars - salesUnit * originalRow.cost;
    const gmPercent = salesDollars ? `${((gmDollars / salesDollars) * 100).toFixed(2)}%` : "";

    const newRow: PlanningRow = { ...updatedRow, salesDollars, gmDollars, gmPercent };

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === originalRow.id ? { ...row, ...newRow } : row 
      )
    );

    return newRow; 
  };

  const handleCellEdit = (params: { id: string; field: string; value: any }) => {
    if (params.field === "salesUnit") {
      setRows((prevRows) =>
        prevRows.map((row) => {
          if (row.id === params.id) {
            const salesUnit = Number(params.value) || 0;
            const salesDollars = salesUnit * row.price;
            const gmDollars = salesDollars - salesUnit * row.cost;
            const gmPercent = salesDollars ? `${((gmDollars / salesDollars) * 100).toFixed(2)}%` : "";

            return { ...row, salesUnit, salesDollars, gmDollars, gmPercent };
          }
          return row;
        })
      );
    }
  };

  const columns: GridColDef[] = [
    { field: "storeName", headerName: "Store", width: 150 },
    { field: "skuName", headerName: "SKU", width: 150 },
    {
      field: "salesUnit",
      headerName: "Sales Unit",
      width: 120,
      editable: true, // ✅ Allows inline editing
    },
    {
      field: "salesDollars",
      headerName: "Sales Dollars",
      width: 120,
      renderCell: (params: GridRenderCellParams) => <>{params.row.salesDollars || ""}</>,
    },
    {
      field: "gmDollars",
      headerName: "GM Dollars",
      width: 120,
      renderCell: (params: GridRenderCellParams) => <>{params.row.gmDollars || ""}</>,
    },
    {
      field: "gmPercent",
      headerName: "GM %",
      width: 120,
      renderCell: (params: GridRenderCellParams) => <>{params.row.gmPercent || ""}</>,
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate} // ✅ Ensures calculations update correctly
      />
    </Box>
  );
};

export default PlanningPage;
