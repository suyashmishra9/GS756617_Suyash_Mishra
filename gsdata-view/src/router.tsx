import {Routes, Route } from "react-router-dom";
import StorePage from "./pages/StorePage"
import SKUPage from "./pages/SKUPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/" element = {<StorePage/>} />
        <Route path="/skus" element={<SKUPage />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
   
  );
}
