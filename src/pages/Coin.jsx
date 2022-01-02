import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./Coin.css";

function Coin() {
  let params = useParams();
  const [coin, setCoin] = useState({});
  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${params.coin}`) // fetching the current URL parameter
      .then((res) => res.json())
      .then((data) => setCoin(data));
    console.log(coin);
  }, []);
  return (
    <section className="coinsection">
      <Link to="/">
        <button>Go back!</button>
      </Link>
      <div className="coin">
        {coin.name && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <img
                src={coin.image.small}
                alt={coin.name}
                width={32}
                height={32}
              />
              <h1>{coin.name}</h1>
              <p className="symbol">
                <b>{coin.symbol.toUpperCase()}</b>
              </p>
            </div>
            <div className="coininfo">
              {coin.market_data && (
                <div className="price">
                  <p>
                    <b>Price:</b> {coin.market_data.current_price.usd} USD
                  </p>
                  <p>
                    <b>Price:</b> {coin.market_data.current_price.eur} EUR
                  </p>
                  <p>
                    <b>Price:</b> {coin.market_data.current_price.sek} SEK
                  </p>
                  <p>
                    <b>Price:</b> {coin.market_data.current_price.gbp} GBP
                  </p>
                </div>
              )}
              {coin.contract_address && (
                <p style={{ maxWidth: "300px" }}>
                  Contract address: {coin.contract_address}
                </p>
              )}
              <a href={coin.links.blockchain_site[0]}>
                {coin.links.blockchain_site[0]}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Coin;
