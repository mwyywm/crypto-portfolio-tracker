import React from "react";
import "./MarketCard.css";

export default function MarketCard({ card }) {
  console.log(card[1]);
  if (card[1].title === "Trending")
    return (
      <div className="market-card">
        <p className="market-card-title">{card[1].title}</p>
        <ul className="market-card-trending">
          <li className="market-card-value">
            {" "}
            <img src={card[1].valueImg} alt={card[1].value} />
            {card[1].value}
          </li>
          <li className="market-card-value">
            {" "}
            <img src={card[1].valueImg2} alt={card[1].value2} />
            {card[1].value2}
          </li>
          <li className="market-card-value">
            {" "}
            <img src={card[1].valueImg3} alt={card[1].value3} />
            {card[1].value3}
          </li>
        </ul>
      </div>
    );
  else if (
    card[1].title === "Global Market Cap" ||
    card[1].title === "Global Volume (24h)"
  )
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
  else if (
    card[1].title === "BTC Dominance" ||
    card[1].title === "ETH Dominance"
  )
    return (
      <div className="market-card">
        <p className="market-card-title">{card[1].title}</p>
        <div className="market-card-text">
          <p>{card[1].value}</p>
        </div>
      </div>
    );
}
