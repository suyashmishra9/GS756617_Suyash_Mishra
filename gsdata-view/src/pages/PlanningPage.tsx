  import React, { useEffect, useState } from "react";
  import { useSelector } from "react-redux";
  import { DataGrid, GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
  import { RootState } from "../redux/store";
  import { Box } from "@mui/material";
  // import dayjs from "dayjs"; 

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
    const stores = useSelector((state: RootState) => state.store.stores);
    const skus = useSelector((state: RootState) => state.sku.skus);
    const [rows, setRows] = useState<PlanningRow[]>([]);

    useEffect(() => {
      if (stores.length > 0 && skus.length > 0) {
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
        setRows(planningData);
      }
    }, [stores, skus]);

    const processRowUpdate = (updatedRow: PlanningRow, originalRow: PlanningRow) => {
      const newRow = { ...updatedRow };

      weeks.forEach((week) => {
        const salesUnit = Number(newRow[`${week}_salesUnit`]) || 0;
        const salesDollars = salesUnit * originalRow.price;
        const gmDollars = salesDollars - salesUnit * originalRow.cost;
        const gmPercent = salesDollars ? `${((gmDollars / salesDollars) * 100).toFixed(2)}%` : "";

        newRow[`${week}_salesDollars`] = salesDollars;
        newRow[`${week}_gmDollars`] = gmDollars;
        newRow[`${week}_gmPercent`] = gmPercent;
      });

      setRows((prevRows) =>
        prevRows.map((row) => (row.id === originalRow.id ? newRow : row))
      );

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
      children: [
        {
          groupId: "Week 1",
          children: [
            { field: "week1_salesUnit" },
            { field: "week1_salesDollars" },
            { field: "week1_gmDollars" },
            { field: "week1_gmPercent" },
          ],
        },
        {
          groupId: "Week 2",
          children: [
            { field: "week2_salesUnit" },
            { field: "week2_salesDollars" },
            { field: "week2_gmDollars" },
            { field: "week2_gmPercent" },
          ],
        },
        {
          groupId: "Week 3",
          children: [
            { field: "week3_salesUnit" },
            { field: "week3_salesDollars" },
            { field: "week3_gmDollars" },
            { field: "week3_gmPercent" },
          ],
        },
        {
          groupId: "Week 4",
          children: [
            { field: "week4_salesUnit" },
            { field: "week4_salesDollars" },
            { field: "week4_gmDollars" },
            { field: "week4_gmPercent" },
          ],
        },
      ],
    },
  ];

    return (
      <Box sx={{ height: 500, width: "100%", overflowX: "auto", position: "relative", zIndex: 1 }}>
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
