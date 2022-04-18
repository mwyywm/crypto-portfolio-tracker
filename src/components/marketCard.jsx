import React, { Component } from "react";
import "./marketCard.css";

export default function MarketCard({ card }) {
  return (
    <div className="market-card">
      <p className="market-card-title">{card[1].title}</p>
      <div className="market-card-text">
        <p>{card[1].value}</p>
        <p>{card[1].change}</p>
      </div>
    </div>
  );
}
