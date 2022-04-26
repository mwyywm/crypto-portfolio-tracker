import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
export default function TrackerChart({ data }) {
  // destructure data from props
  const yo = data?.map((coin) => {
    return {
      name: coin.name,
      value: Number((coin.holdings * coin.price).toFixed(2)),
    };
  });

  const COLORS = [
    "#ee6c4d",
    "#1e2019",
    "#4B3F72",
    "#417B5A",
    "#1F4CAD",
    "#982649",
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        fontSize="20"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  // if we have data, render chart else return null
  return data ? (
    <ResponsiveContainer width="100%" aspect="1">
      <PieChart margin="0 auto">
        <Pie
          data={yo}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="black"
          isAnimationActive={false}
        >
          {yo.map((name, index) => (
            <Cell key={`cell-${name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  ) : null;
}
