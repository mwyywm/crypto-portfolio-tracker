import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import "./Coin.css";

function Coin() {
  let params = useParams();
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${params.coin}`,
    fetcher
  );
  if (!data) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;
  return (
    <section className="coinsection">
      <Link to="/">
        <button>Go back!</button>
      </Link>
      {data.name && (
        <div className="coin">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <img
                src={data.image.small}
                alt={data.name}
                width={32}
                height={32}
              />
              <h1>{data.name}</h1>
              <p className="symbol">
                <b>{data.symbol.toUpperCase()}</b>
              </p>
            </div>
            <div className="coininfo">
              {data.market_data && (
                <div className="price">
                  <h2
                    style={{
                      color:
                        data.market_data.price_change_percentage_24h > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {data.market_data.price_change_percentage_24h}
                  </h2>
                  <p>
                    <b>Price:</b> {data.market_data.current_price.usd} USD
                  </p>
                  <p>
                    <b>Price:</b> {data.market_data.current_price.eur} EUR
                  </p>
                  <p>
                    <b>Price:</b> {data.market_data.current_price.sek} SEK
                  </p>
                  <p>
                    <b>Price:</b> {data.market_data.current_price.gbp} GBP
                  </p>
                </div>
              )}
              {data.contract_address && (
                <p style={{ maxWidth: "300px" }}>
                  Contract address: {data.contract_address}
                </p>
              )}
              <Link to={data.links.blockchain_site[0]}>
                {data.links.blockchain_site[0]}
              </Link>
            </div>
          </div>
          {/* <div>
            <input
              name="data"
              type="number"
              min={0}
              value={converter.data}
              onChange={handleChange}
            />
            <input
              name="currency"
              value={converter.currency}
              onChange={handleChange}
            />
          </div> */}
        </div>
      )}
    </section>
  );
}

export default Coin;
