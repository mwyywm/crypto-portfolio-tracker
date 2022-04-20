import React from "react";
import useSWR from "swr";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Chart({ chartObj }) {
  // TODO: Add mutate() to coinRow component to prefetch data in chart
  // TODO: wrap chart in a https://recharts.org/en-US/api/ResponsiveContainer
  // https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7&interval=daily

  return (
    <LineChart width={600} height={400} data={chartObj}>
      <YAxis type="number" domain={["auto", "auto"]} dataKey="price" />
      <XAxis dataKey="date" />
      <Tooltip />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="price" stroke="green" strokeWidth="3px" />
    </LineChart>
  );
}
