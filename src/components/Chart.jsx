import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Chart() {
  const [chartObj, setChartObj] = useState([]);
  const { data, error: chartError } = useSWR(
    "https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=7&interval=daily",
    {
      onSuccess: (data) => {
        let obj = [];
        data?.prices.map((curr) => {
          obj = [
            ...obj,
            {
              name: "ye",
              price: curr[1],
              date: new Date(curr[0]).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
              }),
            },
          ];
        });
        console.log(obj);
        setChartObj(obj);
      },
    }
  );

  return (
    <LineChart width={600} height={400} data={chartObj}>
      <XAxis dataKey="date" />
      <YAxis domain={["auto", "auto"]} />
      <Tooltip />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="price" stroke="green" strokeWidth="3px" />
    </LineChart>
  );
}
