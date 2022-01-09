import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "../components/NotFound";

import "./Coin.css";

function Coin() {
  let params = useParams();
  const [coin, setCoin] = useState({});
  const [converter, setConverter] = useState({ coin: 0, currency: 0 });
  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${params.coin}`) // fetching the current URL parameter
      // handle 404 error
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          setCoin({ error: "404" });
          throw new Error("Could not find coin with the given id");
        }
      })
      .then((data) => setCoin(data));
  }, [params.coin]);

  // TODO: should probably use a form library to handle the form
  // function handleChange(e) {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   console.log(converter);
  //   setConverter({
  //     ...converter,
  //     coin: Number(value),
  //     currency: converter.coin * coin.market_data.current_price.usd,
  //   });
  // }

  return (
    <section className="coinsection">
      <Link to="/">
        <button>Go back!</button>
      </Link>
      {coin.error == "404" && <NotFound />}
      {coin.name && (
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
                  <h2
                    style={{
                      color:
                        coin.market_data.price_change_percentage_24h > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {coin.market_data.price_change_percentage_24h}
                  </h2>
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
              <Link to={coin.links.blockchain_site[0]}>
                {coin.links.blockchain_site[0]}
              </Link>
            </div>
          </div>
          {/* <div>
            <input
              name="coin"
              type="number"
              min={0}
              value={converter.coin}
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
