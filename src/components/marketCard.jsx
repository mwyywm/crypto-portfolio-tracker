import React from "react";
import "./marketCard.css";

export default function MarketCard({ card }) {
  const { first, second, third } = card[1];

  if (card[1].type === "trending")
    return (
      <div className="market-card">
        <p className="market-card-title">{card[1].title}</p>
        <ol className="market-card-trending">
          <a className="market-card-value" href={`/coin/${first.slug}`}>
            {" "}
            <img src={first.valueImg} alt={first.value} />
            {first.value}
          </a>
          <a className="market-card-value" href={`/coin/${second.slug}`}>
            {" "}
            <img src={second.valueImg2} alt={second.value2} />
            {second.value2}
          </a>
          <a className="market-card-value" href={`/coin/${third.slug}`}>
            {" "}
            <img src={third.valueImg3} alt={third.value3} />
            {third.value3}
          </a>
        </ol>
      </div>
    );
  else if (card[1].type === "global")
    return (
      <div className="market-card">
        <p className="market-card-title">{card[1].title}</p>
        <div className="market-card-text">
          <p>{card[1].value}</p>
          <p
            className="market-card-change"
            style={{
              color: card[1].change > 0 ? "green" : "red",
              paddingLeft: "5px",
            }}
          >
            {card[1].change}
          </p>
        </div>
      </div>
    );
  else if (card[1].type === "dominance")
    return (
      <div className="market-card">
        <p className="market-card-title">{card[1].title}</p>
        <div className="market-card-text">
          <p>{card[1].value}</p>
        </div>
      </div>
    );
}
