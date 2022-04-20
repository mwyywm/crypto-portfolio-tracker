import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function Chart({ chartObj }) {
  return (
    <ResponsiveContainer width="100%" aspect="1.5">
      <LineChart width={600} height={400} data={chartObj}>
        <YAxis
          type="number"
          stroke="black"
          domain={["auto", "auto"]}
          dataKey="price"
        />
        <XAxis dataKey="date" stroke="#111216" />
        <Tooltip />
        <ReferenceLine stroke="red" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="price"
          stroke="black"
          strokeWidth="3px"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
