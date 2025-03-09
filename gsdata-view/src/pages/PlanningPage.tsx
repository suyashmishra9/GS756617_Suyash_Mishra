import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { RootState } from "../redux/store";
 


ModuleRegistry.registerModules([ClientSideRowModelModule]);

const PlanningPage: React.FC = () => {
  const stores = useSelector((state: RootState) => state.store?.stores);
const skus = useSelector((state: RootState) => state.sku?.skus);

  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    console.log("Stores from Redux:", stores);
    console.log("SKUs from Redux:", skus);
    if (stores.length > 0 && skus.length > 0) {
      const planningData = stores.flatMap((store: { id: any; name: any; }) =>
        skus.map((sku: { id: any; name: any; price: any; cost: any; }) => ({
          storeId: store.id,
          storeName: store.name,
          skuId: sku.id,
          skuName: sku.name,
          price: sku.price,
          cost: sku.cost,
          salesUnit: 0,
          salesDollars: 0,
          gmDollars: 0,
          gmPercent: 0,
        }))
      );
      setRowData(planningData);
    }
  }, [stores, skus]);

  const columnDefs = [
    { headerName: "Store", field: "storeName", sortable: true },
    { headerName: "SKU", field: "skuName" },
    { headerName: "Sales Unit", field: "salesUnit", editable: true },
    { headerName: "Sales Dollars", field: "salesDollars" },
    { headerName: "GM Dollars", field: "gmDollars" },
    { headerName: "GM %", field: "gmPercent" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default PlanningPage;
