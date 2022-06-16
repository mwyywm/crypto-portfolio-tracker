import React from "react";
import formatNumber from "../utils/formatNumber";
import "./portfoliocoin.css";

export default function PortfolioCoin({ coin, handleEdit, handleRemoveCoin }) {
  return (
    <div className="portfolio-coin">
      <div className="portfolio-coin-name">
        {coin.image && (
          <img
            src={coin.image}
            style={{
              width: "32px",
              height: "32px",
              marginRight: "5px",
            }}
          />
        )}
        <p>{coin.name}</p>
      </div>
      <div className="portfolio-buttons">
        <div className="portfolio-coin-holdings">
          <p>
            {coin.holdings} {coin.symbol}
          </p>
          <button onClick={handleEdit} id={coin.name}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              id={coin.name}
            >
              <path fill="none" d="M0 0h24v24H0z" id={coin.name} />
              <path
                d="M5 19h1.414l9.314-9.314-1.414-1.414L5 17.586V19zm16 2H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L9.243 19H21v2zM15.728 6.858l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414z"
                id={coin.name}
              />
            </svg>
          </button>
        </div>
        <div className="portfolio-coin-total">
          <p>{"$" + formatNumber(coin.holdings * coin.price, 2)}</p>
          <button onClick={() => handleRemoveCoin(coin.name)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
