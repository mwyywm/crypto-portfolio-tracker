import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
          width={100} /* coins like with a lot of decimals high width */
        />
        <XAxis dataKey="date" stroke="#111216" />
        <Tooltip />
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
