import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import formatNumber from "../utils/formatNumber";

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          background: "black",
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        {label && <p className="label">{`Date: ${label}`}</p>}
        {payload[0]?.value && <p>Price: ${formatNumber(payload[0]?.value)}</p>}
      </div>
    );
  }

  return null;
}
export default function Chart({ chartObj }) {
  return (
    <ResponsiveContainer width="100%" aspect="1.8">
      <LineChart width={600} height={400} data={chartObj}>
        <YAxis
          type="number"
          stroke="white"
          domain={["auto", "auto"]}
          dataKey="price"
          tickFormatter={(value) => formatNumber(value)}
        />
        <XAxis dataKey="date" stroke="white" />
        <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="white"
          strokeWidth="2px"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
