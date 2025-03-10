import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { selectGMDataByStore } from "../redux/slices/planningSlice";
import {
   Line,  Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, ComposedChart
} from "recharts";
import { Box, Select, MenuItem, Typography } from "@mui/material";

const ChartPage: React.FC = () => {
  const stores = useSelector((state: RootState) => state.store.stores);
  const [selectedStore, setSelectedStore] = useState(stores.length > 0 ? stores[0].name : "");
  const chartData = useSelector((state: RootState) => selectGMDataByStore(state, selectedStore));

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        GM Dollars & GM % Chart
      </Typography>

      {/* Store Selection Dropdown */}
      <Select
        value={selectedStore}
        onChange={(e) => setSelectedStore(e.target.value)}
        sx={{ marginBottom: 3, width: 200 }}
      >
        {stores.map((store) => (
          <MenuItem key={store.id} value={store.name}>
            {store.name}
          </MenuItem>
        ))}
      </Select>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" label={{ value: "GM Dollars", angle: -90, position: "insideLeft" }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "GM %", angle: -90, position: "insideRight" }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip />
          <Legend />

          {/* GM Dollars (Bar) - Purple */}
          <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" name="GM Dollars" />

          {/* GM % (Line) - Orange */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gmPercent"
            stroke="#ff7300"
            strokeWidth={2}
            dot={false}
            name="GM %"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ChartPage;
