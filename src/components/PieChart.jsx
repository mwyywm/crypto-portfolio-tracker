import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import formatNumber from "../utils/formatNumber";
function CustomTooltip({ payload, active }) {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          background: "black",
          padding: "8px",
          borderRadius: "8px",
          border: `1px solid ${payload[0].payload.fill}`,
        }}
      >
        <p style={{ color: `${payload[0].payload.fill}` }}>
          {payload[0]?.name}
        </p>
        <p>Price: ${formatNumber(payload[0].value)}</p>
      </div>
    );
  }

  return null;
}
export default function TrackerChart({ data }) {
  const priceData = data?.map((coin) => {
    return {
      name: coin.name,
      value: Number((coin.holdings * coin.price).toFixed(2)),
    };
  });

  const COLORS = [
    "#8F00FF",
    "#00FFF7",
    "#FF9F00",
    "#FF007D",
    "#004FFF",
    "#FF00D7",
    "#4B3F72",
    "#1F4CAD",
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
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        style={{ pointerEvents: "none" }}
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
          data={priceData}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="black"
          blendStroke={true}
          isAnimationActive={false}
        >
          {priceData.map((name, index) => (
            <Cell key={`cell-${name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  ) : null;
}
